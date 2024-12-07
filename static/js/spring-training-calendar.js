import { LitElement, html, css } from '/js/lit-core.min.js';

class SpringTrainingCalendar extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 20px 0;
    }
    #calendar {
      background: var(--entry);
      padding: 20px;
      border-radius: 8px;
      position: relative;
    }
    ::part(fc-event) {
      padding: 4px 8px;
      cursor: pointer;
    }
    ::part(fc-daygrid-day) {
      min-height: 100px !important;
    }
    /* Enhanced tooltip styles */
    .fc-event-tooltip {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-width: 250px;
      backdrop-filter: blur(8px);
    }
    .tooltip-title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 8px;
      color: var(--primary);
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }
    .tooltip-date {
      color: var(--secondary);
      margin-bottom: 12px;
      font-size: 14px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }
    .tooltip-description {
      line-height: 1.4;
      color: var(--content);
    }
    /* Modal styles */
    .modal-backdrop {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: var(--entry);
      border-radius: 12px;
      padding: 24px;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      cursor: pointer;
      font-size: 24px;
      color: var(--secondary);
      background: none;
      border: none;
      padding: 4px;
    }
    .modal-close:hover {
      color: var(--primary);
    }
    .modal-title {
      font-size: 24px;
      font-weight: bold;
      color: var(--primary);
      margin-bottom: 16px;
    }
    .modal-date {
      color: var(--secondary);
      margin-bottom: 20px;
      font-size: 16px;
    }
    .modal-description {
      line-height: 1.6;
      color: var(--content);
      font-size: 16px;
    }
    /* Added mobile-specific styles */
    @media (max-width: 768px) {
      .modal-content {
        width: 95%;
        padding: 16px;
        margin: 16px;
      }

      .modal-title {
        font-size: 20px;
        margin-bottom: 12px;
      }

      .modal-date {
        font-size: 14px;
        margin-bottom: 16px;
      }

      .modal-description {
        font-size: 14px;
        line-height: 1.4;
      }

      .modal-close {
        top: 12px;
        right: 12px;
        font-size: 20px;
      }
    }
    /* Table styles */
    .events-table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
      background: var(--entry);
      border-radius: 8px;
      overflow: hidden;
    }

    .events-table th,
    .events-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }

    .events-table th {
      background: var(--code-bg);
      color: var(--primary);
      font-weight: bold;
    }

    .events-table tr:last-child td {
      border-bottom: none;
    }

    .events-table tr:hover {
      background: var(--code-bg);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .events-table th,
      .events-table td {
        padding: 8px 12px;
        font-size: 14px;
      }
    }

    .seat-grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }
    
    .seat-row {
      display: flex;
      gap: 2px;
    }
    
    .seat-box {
      position: relative;
    }
    
    .seat-box svg {
      width: 24px;
      height: 24px;
      display: block;
    }
    
    .seat-box:hover::after {
      content: attr(data-seat);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--code-bg);
      color: var(--content);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
    }
  `;

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTableDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  formatDescriptionDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  }

  firstUpdated() {
    this.loadScript('/js/fullcalendar/core/index.global.min.js')
      .then(() => this.loadScript('/js/fullcalendar/daygrid/index.global.min.js'))
      .then(() => {
        setTimeout(() => {
          this.loadCalendarData();
        }, 100);
      })
      .catch(error => {
        console.error('Error loading FullCalendar scripts:', error);
      });
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadCalendarData() {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/spring-training-2025.json?t=${timestamp}`);
      const data = await response.json();
      this.initializeCalendar(data.events);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    }
  }

  createSeatGrid(seats) {
    return `
      <div class="seat-grid">
        <div class="seat-row">
          <div class="seat-box" data-seat="103A-6">
            <svg viewBox="0 0 24 24">
              <rect width="24" height="24" fill="${seats.s103a6 ? '#28a745' : '#dc3545'}" rx="4"/>
            </svg>
          </div>
        </div>
        <div class="seat-row">
          <div class="seat-box" data-seat="103B-5">
            <svg viewBox="0 0 24 24">
              <rect width="24" height="24" fill="${seats.s103b5 ? '#28a745' : '#dc3545'}" rx="4"/>
            </svg>
          </div>
          <div class="seat-box" data-seat="103B-6">
            <svg viewBox="0 0 24 24">
              <rect width="24" height="24" fill="${seats.s103b6 ? '#28a745' : '#dc3545'}" rx="4"/>
            </svg>
          </div>
          <div class="seat-box" data-seat="103B-7">
            <svg viewBox="0 0 24 24">
              <rect width="24" height="24" fill="${seats.s103b7 ? '#28a745' : '#dc3545'}" rx="4"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  initializeCalendar(events) {
    if (!window.FullCalendar) {
      console.error('FullCalendar not loaded');
      return;
    }

    const calendarEl = this.shadowRoot.querySelector('#calendar');
    const calendar = new window.FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: events,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      validRange: {
        start: '2025-02-23',
        end: '2025-03-23'
      },
      initialDate: '2025-02-23',
      fixedWeekCount: false,
      showNonCurrentDates: false,
      eventDisplay: 'block',
      dayMaxEvents: 1,
      eventContent: function(arg) {
        return {
          html: `<div style="font-weight: bold;">${arg.event.title}</div>`
        };
      },
      eventDidMount: (info) => {
        info.el.addEventListener('click', (e) => {
          e.stopPropagation();
          
          const modal = document.createElement('div');
          modal.classList.add('modal-backdrop');
          modal.innerHTML = `
            <div class="modal-content">
              <button class="modal-close">&times;</button>
              <div class="modal-title">${info.event.title}</div>
              <div class="modal-date">${this.formatDate(info.event.start)}</div>
              <div class="modal-description">${info.event.extendedProps.description.replace(/\s+on.*?, 2025/, ` on ${this.formatDescriptionDate(info.event.start)}`)}</div>
              ${this.createSeatGrid(info.event.extendedProps.seatsAvailable)}
            </div>
          `;
          
          this.shadowRoot.appendChild(modal);
          
          // Close modal when clicking outside or on close button
          modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
              modal.remove();
            }
          });

          // Close on escape key
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
              modal.remove();
            }
          }, { once: true });
        });
      }
    });

    // Add table population
    const tableBody = this.shadowRoot.querySelector('#events-table-body');
    
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => new Date(a.start) - new Date(b.start));
    
    sortedEvents.forEach(event => {
      const row = document.createElement('tr');
      const description = event.description.replace(/\s+on.*?, 2025/, ` on ${this.formatDescriptionDate(event.start)}`);
      row.innerHTML = `
        <td>${this.formatTableDate(event.start)}</td>
        <td>${description}</td>
        <td>${this.createSeatGrid(event.seatsAvailable)}</td>
      `;

      // Add click handler to show modal
      row.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal-backdrop');
        modal.innerHTML = `
          <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-title">${event.title}</div>
            <div class="modal-date">${this.formatDate(event.start)}</div>
            <div class="modal-description">${event.extendedProps.description.replace(/\s+on.*?, 2025/, ` on ${this.formatDescriptionDate(event.start)}`)}</div>
            ${this.createSeatGrid(event.seatsAvailable)}
          </div>
        `;
        
        this.shadowRoot.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
          if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.remove();
          }
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            modal.remove();
          }
        }, { once: true });
      });

      tableBody.appendChild(row);
    });

    calendar.render();
  }

  render() {
    return html`
      <div id="calendar"></div>
      <table class="events-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody id="events-table-body"></tbody>
      </table>
    `;
  }
}

customElements.define('spring-training-calendar', SpringTrainingCalendar); 
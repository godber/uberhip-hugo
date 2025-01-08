# Uberhip.com Blog - Hugo Edition

## TODO

- [ ] Setup a static.uberhip.com domain for the things that fall outside of the
  generated blog.

## Initial Setup

### InstallGit LFS

Brief notes on installing git-lfs and getting it to work.

```bash
# Install git-lfs
brew install git-lfs
# Install the git-lfs hooks
git lfs install
# How to track new file types
git lfs track "*.jpg"
git lfs track "*.gif"
git lfs track "*.png"
```

## Setup

### The PaperMode Theme

```bash
git clone git@github.com:godber/uberhip-hugo.git
cd uberhip-hugo
git submodule update --init --recursive # needed when you reclone your repo (submodules may not get cloned automatically)
```

## Sync

```bash
rsync -avv public/ balancar:/var/www/www.uberhip.com/
```

## Releases

This repository automatically creates releases when version tags are pushed. 
Each release includes a tarball of the built site.

To create a new release:
1. Tag the commit you want to release:
   ```bash
   git tag v1.0.0
   ```
2. Push the tag:
   ```bash
   git push origin v1.0.0
   ```
3. The GitHub Action will automatically build the site and create a release
with the built files.

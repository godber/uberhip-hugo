# Uberhip.com Blog - Hugo Edition

## TODO

- [ ] Setup a static.uberhip.com domain for the things that fall outside of the
  generated blog.

## Build

## Git LFS

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

## The PaperMode Theme

```bash
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
git submodule update --init --recursive # needed when you reclone your repo (submodules may not get cloned automatically)
```
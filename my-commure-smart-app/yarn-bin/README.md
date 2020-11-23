### yarn-bin

This file contains the `yarn` binary that is pointed to by `.yarnrc`. This is so that everyone uses the same version of yarn when working in the Commure repo, regardless of what version(s) they have installed locally.

To upgrade to the latest version, run `./update_yarn.sh` and modify `preinstall-checks.js` to check for the new version.

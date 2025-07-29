#!/bin/bash
# get latest from upstream, prune the upstream branches that have no local
# get rest of the branches and see which no longer has upstream, then delete them.
git fetch --prune; git branch --verbose | grep "\[gone\]" | awk '{ print $1 }' | xargs git branch -D

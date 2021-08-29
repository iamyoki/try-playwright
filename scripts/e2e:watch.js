#! /usr/bin/env node

const { watch } = require('chokidar')
const { spawn } = require('child_process')

const watchPaths = process.env.PATHS ?? 'e2e/**.{test,spec}.js'

/** @type {import('child_process').ChildProcess} */
let child

const runCommand = () =>
  spawn('npx', ['playwright', 'test'], {
    stdio: 'inherit'
  })

function launch() {
  if (child) {
    /* 
      1. kill prev child
      2. run command and replace child after close
      3. make sure remove all waiting command before last command 
    */
    child.removeAllListeners()
    child.kill()

    child.addListener('close', () => {
      child = runCommand()
    })
  } else {
    /* 
      1. run command to init child
      2. make child to be falsy if closed by itself
    */
    child = runCommand()

    child.addListener('close', () => {
      child = undefined
    })
  }
}

watch(['e2e', '.*(test|spec).(js|ts|mjs)']).on('all', launch)

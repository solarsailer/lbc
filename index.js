import dotenv from 'dotenv'
import automateTasks from './lib/lbc/index'

// -------------------------------------------------------------
// Script.
// -------------------------------------------------------------

// Load environment.
dotenv.config()

// Automate!
automateTasks()

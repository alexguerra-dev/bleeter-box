'use client'
import { useState, useEffect } from 'react'
import { createDevice } from '@rnbo/js'

import DrumMachine from '../components/DrumMachine'

let WAContext = window.AudioContext || (window as any).webkitAudioContext
let context = new WAContext()
export default function Home() {
    useEffect(() => {
        const setup = async () => {
            let rawPatcher = await fetch('/export/patch.export.json')
            let patcher = await rawPatcher.json()

            let device = await createDevice({ context, patcher })

            // This connects the device to audio output, but you may still need to call context.resume()
            // from a user-initiated function.
            device.node.connect(context.destination)
        }

        setup()
    }, [])

    const start = () => {
        console.log(`The context is ${context.state}`)
        console.log('Going to start the context')
        context.resume()
        console.log(`The context is now ${context.state}`)
    }

    const stop = () => {
        console.log(`The context is ${context.state}`)
        console.log('Going to stop the context')
        context.suspend()
        console.log(`The context is now ${context.state}`)
    }

    return (
        <div className="bg-red-300 text-8xl">
            <h1>First Page</h1>
            <p>Gunna be a synth thing</p>

            <div className="bg-green-600 w-20 h-20">hi</div>
            <DrumMachine />
            <div className="flex flex-col p-100 m-20">
                <button className="bg-green-700" onClick={start}>
                    Click Me To Start
                </button>
                <button className="bg-red-800" onClick={stop}>
                    Click Me To Stop
                </button>
                <button>Click Me To List All The Paramiters</button>
            </div>
        </div>
    )
}

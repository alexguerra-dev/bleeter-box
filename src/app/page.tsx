'use client'
import { useEffect } from 'react'
import { createDevice } from '@rnbo/js'

import DrumMachine from '../components/DrumMachine'

export default function Home() {
    useEffect(() => {
        let WAContext =
            window.AudioContext || (window as any).webkitAudioContext
        let context = new WAContext()

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

    return (
        <div className="bg-red-300 text-8xl">
            <h1>First Page</h1>
            <p>Gunna be a synth thing</p>
            <div className="bg-green-600 w-20 h-20">hi</div>
            <DrumMachine />
        </div>
    )
}

'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import { createDevice, TimeNow, MessageEvent } from '@rnbo/js'

let WAContext
let context: AudioContext

if (typeof window !== 'undefined') {
    WAContext = window.AudioContext || (window as any).webkitAudioContext
    context = new WAContext()
}

export default function Page() {
    const [device, setDevice] = useState<any>(null)
    const [gainValue, setGainValue] = useState(0)

    useEffect(() => {
        const setup = async () => {
            let rawPatcher = await fetch('/export/patch.export.json')
            let patcher = await rawPatcher.json()

            let device = await createDevice({ context, patcher })
            // This connects the device to audio output, but you may still need to call context.resume()
            // from a user-initiated function.
            device.node.connect(context.destination)
            setDevice(device)
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

    const listParams = () => {
        console.log('Listing all the paramiters')
        console.log(context)

        device.parameters.forEach((param) => {
            console.log(param)
        })
    }

    const setGain = () => {
        console.log('Setting the gain')
        const event2 = new MessageEvent(TimeNow, 'dest', [75])
        setDevice(event2)
    }
    const setGainToZero = () => {
        const param = device.parametersById.get('gain')
        param.value = 0
    }

    const setGainToHalf = () => {
        const param = device.parametersById.get('gain')
        param.value = 50
    }
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value)
        setGainValue(value)
        if (device) {
            const param = device.parametersById.get('gain')
            param.value = value
        }
    }
    return (
        <div className=" text-7xl">
            <div className="flex flex-col items-center">
                <div className="flex bg-slate-400">
                    <button
                        className="bg-green-700 rounded-2xl p-3 m-3"
                        onClick={start}
                    >
                        Start Audio
                    </button>
                    <button
                        className="bg-red-800 rounded-2xl p-3 m-3"
                        onClick={stop}
                    >
                        Stop Audio
                    </button>
                </div>
                <button onClick={listParams}>List Paramiters</button>

                <button onClick={setGainToZero}>Gain to 0.0</button>
                <button onClick={setGainToHalf}>Gain to 0.5</button>

                <input
                    type="range"
                    name="gain_slider"
                    id="gain_slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={gainValue}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    )
}

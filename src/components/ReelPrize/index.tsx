import './style.css'

import clsx from 'clsx'
import { CSSProperties, useState } from 'react'

import buttonBg from '@/assets/button.png'
import { useAppSelector } from '@/hooks'

const ReelPrize = () => {
    const { iconWidth, iconGap, slotYAxis, buttonMargin, showResult, iconBackgroundColor } = useAppSelector((state) => state.theme)

    const [spinning, setSpinning] = useState(false)
    const [debug, setDebug] = useState('')
    // Holds icon indexes
    const [indexes, setIndexes] = useState([0, 0, 0])

    // SETUP
    // Mapping of indexes to icons: start from banana in middle of initial position and then upwards
    const iconMap = [
        ['1 bước', 'Đánh thức', '1 chạm', 'Tài khoản', '1 ngày', 'Logo'],
        ['Rút tiền', 'Dòng tiền', 'Bắt đầu', 'Siêu', 'Sinh lời', 'Logo'],
        ['Linh hoạt', 'Nhàn rỗi', 'Sinh lời', 'Lợi suất', 'Đến 4,3%/năm', 'Logo'],
    ]

    // Height of one icon in the strip
    const icon_height = iconWidth * 1.5
    // Number of icons in the strip
    const num_icons = 6
    // Max-speed in ms for animating one icon down
    const time_per_icon = 100

    // Roll one reel
    const roll: (reel: HTMLElement, offset: number, row: number) => Promise<number> = (reel: HTMLElement, offset = 0, row = -1) => {
        // const roll: (reel: HTMLElement, offset: number) => Promise<number> = (reel: HTMLElement, offset = 0) => {
        // Minimum of 2 + the reel offset rounds
        // const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons)

        let delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons)
        if (row !== -1) {
            delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons)
            for (let i = 0; i < num_icons; i++) {
                if ((indexes[offset] + delta + i) % num_icons === row) {
                    delta += i
                    break
                }
            }
        }

        const style = getComputedStyle(reel)
        // Current background position
        const backgroundPositionY = parseFloat(style.backgroundPositionY)
        // Target background position
        const targetBackgroundPositionY = backgroundPositionY + delta * icon_height
        // Normalized background position, for reset
        const normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height)

        // Return promise so we can wait for all reels to finish
        return new Promise((resolve) => {
            // Delay animation with timeout, for some reason a delay in the animation property causes stutter
            setTimeout(() => {
                // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
                reel.style.transition = `background-position-y ${(8 + delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`
                // Set background position
                reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`
            }, offset * 150)

            // After animation
            setTimeout(
                () => {
                    // Reset position, so that it doesn't get higher without limit
                    reel.style.transition = `none`
                    reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`
                    // Resolve this promise
                    resolve(delta % num_icons)
                },
                (8 + delta) * time_per_icon + offset * 150
            )
        })
    }

    const getRandomNumber = (min: number, max: number) => {
        return Math.round(Math.random() * (max - min) + min)
    }

    // Roll all reels, when promise resolves roll again
    const rollAll = () => {
        setDebug('rolling...')
        setSpinning(true)

        let row
        const random = getRandomNumber(1, 10)
        if (random > 5) {
            console.log('Correct')
            row = getRandomNumber(0, num_icons - 1)
        } else {
            console.log('Incorrect')
            row = -1
        }

        const reelsList: NodeListOf<HTMLElement> = document.querySelectorAll('.slots .octagon > .reel')

        Promise
            // Activate each reel, must convert NodeList to Array for this with spread operator
            .all([...reelsList].map((reel: HTMLElement, i: number) => roll(reel, i, row)))

            // When all reels done animating (all promises solve)
            .then((deltas: number[]) => {
                // add up indexes
                const newIndexes = [...indexes]
                deltas.forEach((delta, i) => {
                    newIndexes[i] = (newIndexes[i] + delta) % num_icons
                    setIndexes(newIndexes)
                })

                setDebug(
                    newIndexes
                        .map((i, j) => {
                            let index: number
                            if (i !== 0) {
                                index = i - 1
                            } else {
                                index = 5
                            }
                            return iconMap[j][index]
                        })
                        .join(' - ')
                )
                setSpinning(false)
            })
    }

    return (
        <div className={'w-full reel-prize flex flex-col'} style={{ marginTop: slotYAxis + 'px', gap: buttonMargin + 'px' }}>
            <div className={clsx(showResult ? 'block' : 'hidden', 'debug text-slate-400 text-center min-w-96 min-h-10')}>{debug}</div>
            <div className={'slots  flex flex-row justify-center items-center'} style={{ '--icon-gap': iconGap + 'px', '--icon-height': iconWidth * 1.5 + 'px', '--icon-width': iconWidth + 'px', '--icon-background-color': iconBackgroundColor } as CSSProperties}>
                <div className={'octagon'}>
                    <div className={'reel'} id={'reel-1'}></div>
                </div>
                <div className={'octagon'}>
                    <div className={'reel'} id={'reel-2'}></div>
                </div>
                <div className={'octagon'}>
                    <div className={'reel'} id={'reel-3'}></div>
                </div>
            </div>
            <div className={'flex flex-row justify-center bg-[#002ae8]'}>
                <button className={'reel text-blue-500 rounded-xl group'} onClick={() => rollAll()} disabled={spinning}>
                    <img src={buttonBg} alt='reel' className={'group-hover:drop-shadow-[rgba(0,0,0,0.35)_0px_5px_15px] shadow-white'} />
                </button>
            </div>
        </div>
    )
}

export default ReelPrize

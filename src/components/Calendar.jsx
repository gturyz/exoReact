import React, { useState, useReducer, useEffect } from 'react'

const isToday = (someDate) => {
    const today = new Date()
    return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
    )
}

function getLeadingDays(state, date, startDay = 1) {
    const result = []
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstWeekday = new Date(year, month, 1).getDay()
    const days = firstWeekday === 0 ? 5 : firstWeekday - startDay - 1
    for (let i = days * -1; i <= 0; i++) {
        const tempDate = new Date(year, month, i)
        result.push({
            date: tempDate,
            day: tempDate.getDate(),
            color: isToday(tempDate) ? "green" : ""
        })
    }
    return result
}

function getMonthDays(state, date) {
    const result = []
    const year = date.getFullYear()
    const month = date.getMonth()
    const lastDay = new Date(year, month + 1, 0).getDate()
    for (let i = 1; i <= lastDay; i++) {
        const tempDate = new Date(year, month, i)
        result.push({
            date: tempDate,
            day: tempDate.getDate(),
            color: isToday(tempDate) ? "green" : ""
        })
    }
    return result
}

const Calendar = () => {

    const [date, setDate] = useState(new Date())
    const [leadingDays, setLeadingDays] = useReducer(getLeadingDays, [])
    const [monthDays, setMonthDays] = useReducer(getMonthDays, [])
    const [trailingDays, setTrailingDays] = useState([])

    const [days, setDays] = useState([])

    useEffect(() => {
        function getTrailingDays(leadingDays, monthDays, date) {
            const result = []
            const year = date.getFullYear()
            const month = date.getMonth()
            const days = 42 - (leadingDays.length + monthDays.length)
            for (let i = 1; i <= days; i++) {
                const tempDate = new Date(year, month + 1, i)
                result.push({
                    date: tempDate,
                    day: tempDate.getDate(),
                    color: isToday(tempDate) ? "green" : ""
                })
            }
            return result
        }
        if (monthDays !== [] && leadingDays !== []) {
            setTrailingDays(getTrailingDays(leadingDays, monthDays, date))
        }
    }, [leadingDays, monthDays])

    useEffect(() => {
        setLeadingDays(date)
        setMonthDays(date)
    }, [date])

    useEffect(() => {
        setDays([...leadingDays, ...monthDays, ...trailingDays])
    }, [leadingDays, trailingDays, monthDays])

    return (
        <div>
            <div style={{ width: 250, textAlign: 'center' }}>
                <button style={{ width: 'calc(100% / 3)', display: 'inline-block' }} onClick={() => setDate(new Date(date.setFullYear(date.getFullYear() - 1)))}>{`<<`}</button>
                <p style={{ width: 'calc(100% / 3)', display: 'inline-block' }}>
                    {date.getFullYear()}
                </p>
                <button style={{ width: 'calc(100% / 3)', display: 'inline-block' }} onClick={() => setDate(new Date(date.setFullYear(date.getFullYear() + 1)))}>{`>>`}</button>
            </div>
            <div style={{ width: 250, textAlign: 'center' }}>

                <button style={{ width: 'calc(100% / 3)', display: 'inline-block' }} onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>{`<<`}</button>
                <p style={{ width: 'calc(100% / 3)', display: 'inline-block' }}>
                    {date.toLocaleString('fr-FR', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase())}
                </p>
                <button style={{ width: 'calc(100% / 3)', display: 'inline-block' }} onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>{`>>`}</button>
            </div>

            <div style={{ width: 250, textAlign: 'center' }}>
                <b style={{ width: 'calc(100% / 7)', display: 'inline-block' }}>Lu</b>
                <b style={{ width: 'calc(100% / 7)', display: 'inline-block' }}>Ma</b>
                <b style={{ width: 'calc(100% / 7)', display: 'inline-block' }}>Me</b>
                <b style={{ width: 'calc(100% / 7)', display: 'inline-block' }}>Je</b>
                <b style={{ width: 'calc(100% / 7)', display: 'inline-block' }}>Ve</b>
                <b style={{ width: 'calc(100% / 7)', display: 'inline-block' }}>Sa</b>
                <b style={{ width: 'calc(100% / 7)', display: 'inline-block' }}>Di</b>
                {days.map((item, index) => {
                    return (<button style={{ width: 'calc(100% / 7)', display: 'inline-block', backgroundColor: item.color }} key={index}>{item.day}</button>)
                })}
            </div>
        </div>
    )
}

export default Calendar
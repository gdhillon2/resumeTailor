import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

interface GaugeChartProps {
    value: number
    color: string
}

const colorMap: Record<string, string> = {
    "text-green-500": "#22c55e",
    "text-yellow-500": "#eab308",
    "text-red-500": "#ef4444"
}

export function GaugeChart({ value, color }: GaugeChartProps) {
    const data = {
        labels: [],
        datasets: [{
            label: "",
            data: [value, 100 - value],
            backgroundColor: [colorMap[color], "transparent"],
            borderColor: [colorMap[color], "transparent"],
            circumference: 180,
            rotation: 270,
            borderRadius: 10
        }],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '85%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    }

    return (
        <div className="relative w-[100%] h-[100%]">
            <Doughnut
                data={data}
                options={options}
            />
            <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`text-center ${color} text-4xl relative`}>
                    {value}
                </div>
                <div className="relative">
                    Overall Score
                </div>
            </div>
        </div >
    )
}

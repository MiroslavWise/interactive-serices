import { RADIAN } from "@/utils/utils-data-map"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, PieLabel } from "recharts"

// const renderCustomizedLabel: PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5
//   const x = cx + radius * Math.cos(-midAngle * RADIAN)
//   const y = cy + radius * Math.sin(-midAngle * RADIAN)

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   )
// }

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

function PieCluster() {
  return (
    <ResponsiveContainer width="2.5rem" height="2.5rem">
      <PieChart width={40} height={40}>
        <Pie data={data} cx="50%" cy="50%" dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieCluster

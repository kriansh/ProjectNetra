import { DashboardContent } from '@/components/dashboard/dashboard-content'

export default function DashboardPage() {
  return (
    <DashboardContent 
      batteryLevel={75}
      audioSpeed={1}
      setAudioSpeed={() => {}}
      vibrationIntensity={50}
      setVibrationIntensity={() => {}}
      audioSpeedEnabled={true}
      setAudioSpeedEnabled={() => {}}
    />
  )
}


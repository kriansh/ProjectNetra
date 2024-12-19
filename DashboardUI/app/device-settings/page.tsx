'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DeviceSettingsPage() {
  const router = useRouter()
  const [micSensitivity, setMicSensitivity] = useState(50)
  const [noiseSuppression, setNoiseSuppression] = useState(false)
  const [noiseSuppressionAdvanced, setNoiseSuppressionAdvanced] = useState(false)
  const [voiceFeedbackVolume, setVoiceFeedbackVolume] = useState(75)
  const [wakeWordSensitivity, setWakeWordSensitivity] = useState(50)
  const [vibrationIntensity, setVibrationIntensity] = useState(50)
  const [proximityRange, setProximityRange] = useState(2)
  const [batteryOptimization, setBatteryOptimization] = useState('balanced')
  const [autoPowerOff, setAutoPowerOff] = useState(10)
  const [hapticFeedback, setHapticFeedback] = useState(50)
  const [audioGuideSpeed, setAudioGuideSpeed] = useState(1)
  const [audioOutput, setAudioOutput] = useState<'default' | 'bluetooth'>('default')

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle>Device Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="audio" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="power">Power</TabsTrigger>
              <TabsTrigger value="sensors">Sensors</TabsTrigger>
            </TabsList>
            <TabsContent value="audio">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="microphone">
                  <AccordionTrigger>Microphone Sensitivity</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      value={[micSensitivity]}
                      onValueChange={(value) => setMicSensitivity(value[0])}
                      max={100}
                      step={1}
                    />
                    <p>Current level: {micSensitivity > 66 ? 'High' : micSensitivity > 33 ? 'Medium' : 'Low'}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="noise-suppression">
                  <AccordionTrigger>Noise Suppression</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="noise-suppression">Standard Mode</Label>
                        <Switch 
                          id="noise-suppression"
                          checked={noiseSuppression}
                          onCheckedChange={setNoiseSuppression}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="noise-suppression-advanced">Advanced Mode</Label>
                        <Switch 
                          id="noise-suppression-advanced"
                          checked={noiseSuppressionAdvanced}
                          onCheckedChange={setNoiseSuppressionAdvanced}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {noiseSuppressionAdvanced ? 'Aggressive noise filtering enabled' : 'Basic noise reduction enabled'}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="voice-feedback">
                  <AccordionTrigger>Voice Feedback Volume</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      value={[voiceFeedbackVolume]}
                      onValueChange={(value) => setVoiceFeedbackVolume(value[0])}
                      max={100}
                      step={1}
                    />
                    <p>Current volume: {voiceFeedbackVolume}%</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="mute-voice" />
                      <Label htmlFor="mute-voice">Mute Voice Feedback</Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="audio-output">
                  <AccordionTrigger>Audio Output Mode</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="default-speaker">Default Speaker</Label>
                        <Switch 
                          id="default-speaker"
                          checked={audioOutput === 'default'}
                          onCheckedChange={() => setAudioOutput('default')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="bluetooth">Bluetooth Device</Label>
                        <Switch 
                          id="bluetooth"
                          checked={audioOutput === 'bluetooth'}
                          onCheckedChange={() => setAudioOutput('bluetooth')}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Currently using: {audioOutput === 'default' ? 'Default Speaker' : 'Bluetooth Device'}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="wake-word">
                  <AccordionTrigger>Wake Word Detection Sensitivity</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      value={[wakeWordSensitivity]}
                      onValueChange={(value) => setWakeWordSensitivity(value[0])}
                      max={100}
                      step={1}
                    />
                    <p>Current sensitivity: {wakeWordSensitivity}%</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="connectivity">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="wifi">
                  <AccordionTrigger>Wi-Fi Configuration</AccordionTrigger>
                  <AccordionContent>
                    <Button>Scan for Networks</Button>
                    <p className="mt-2">Saved Networks:</p>
                    <ul className="list-disc list-inside">
                      <li>Home Network</li>
                      <li>Office Network</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bluetooth">
                  <AccordionTrigger>Bluetooth Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Switch id="bluetooth-pairing" />
                      <Label htmlFor="bluetooth-pairing">Enable Pairing Mode</Label>
                    </div>
                    <p className="mt-2">Paired Devices:</p>
                    <ul className="list-disc list-inside">
                      <li>Bluetooth Headphones</li>
                      <li>Car Audio System</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ota-updates">
                  <AccordionTrigger>OTA Updates</AccordionTrigger>
                  <AccordionContent>
                    <Button>Check for Updates</Button>
                    <p className="mt-2">Current Firmware: v2.1.0</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cloud-sync">
                  <AccordionTrigger>Cloud Sync</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Switch id="cloud-sync" />
                      <Label htmlFor="cloud-sync">Enable Cloud Sync</Label>
                    </div>
                    <Button className="mt-2">Sync Now</Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="navigation">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="vibration">
                  <AccordionTrigger>Vibration Intensity</AccordionTrigger>
                  <AccordionContent>
                    <Slider
                      value={[vibrationIntensity]}
                      onValueChange={(value) => setVibrationIntensity(value[0])}
                      max={100}
                      step={1}
                    />
                    <p>Current intensity: {vibrationIntensity > 75 ? 'High' : vibrationIntensity > 25 ? 'Medium' : vibrationIntensity > 0 ? 'Low' : 'Off'}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="proximity">
                  <AccordionTrigger>Proximity Sensor Sensitivity</AccordionTrigger>
                  <AccordionContent>
                    <Select value={proximityRange.toString()} onValueChange={(value) => setProximityRange(parseInt(value))}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1m</SelectItem>
                        <SelectItem value="2">2m</SelectItem>
                        <SelectItem value="5">5m</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="mt-2">Test Mode</Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="navigation-mode">
                  <AccordionTrigger>Directional Navigation Mode</AccordionTrigger>
                  <AccordionContent>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear Mode</SelectItem>
                        <SelectItem value="dynamic">Dynamic Mode</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="mt-2">
                      <Label htmlFor="nav-speed">Navigation Speed</Label>
                      <Slider id="nav-speed" max={100} step={1} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="gps">
                  <AccordionTrigger>GPS Integration</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Switch id="gps-enable" />
                      <Label htmlFor="gps-enable">Enable GPS</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="location-sharing" />
                      <Label htmlFor="location-sharing">Enable Location Sharing</Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="power">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="battery-optimization">
                  <AccordionTrigger>Battery Optimization</AccordionTrigger>
                  <AccordionContent>
                    <Select value={batteryOptimization} onValueChange={setBatteryOptimization}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Performance</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="saver">Power Saver</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-2">Battery Health: 95%</p>
                    <p>Charge Cycles: 120</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="auto-power-off">
                  <AccordionTrigger>Auto Power Off</AccordionTrigger>
                  <AccordionContent>
                    <Select value={autoPowerOff.toString()} onValueChange={(value) => setAutoPowerOff(parseInt(value))}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="sensors">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="ultrasonic-calibration">
                  <AccordionTrigger>Ultrasonic Sensor Calibration</AccordionTrigger>
                  <AccordionContent>
                    <Button>Manual Calibration</Button>
                    <Button className="ml-2">Auto Calibration</Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="object-recognition">
                  <AccordionTrigger>Object Recognition Sensitivity</AccordionTrigger>
                  <AccordionContent>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select sensitivity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Sensitivity</SelectItem>
                        <SelectItem value="low">Low Sensitivity</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="object-prioritization">
                  <AccordionTrigger>Object Prioritization</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="human-detection" />
                        <Label htmlFor="human-detection">Human Detection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="vehicle-detection" />
                        <Label htmlFor="vehicle-detection">Vehicle Detection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="furniture-detection" />
                        <Label htmlFor="furniture-detection">Furniture Detection</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
          
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="haptic-feedback">
              <AccordionTrigger>Haptic Feedback</AccordionTrigger>
              <AccordionContent>
                <Slider
                  value={[hapticFeedback]}
                  onValueChange={(value) => setHapticFeedback(value[0])}
                  max={100}
                  step={1}
                />
                <p>Current intensity: {hapticFeedback}%</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="led-feedback">
              <AccordionTrigger>LED Feedback</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <Switch id="led-enable" />
                  <Label htmlFor="led-enable">Enable LED Feedback</Label>
                </div>
                <Select className="mt-2">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">Green (Active)</SelectItem>
                    <SelectItem value="red">Red (Error)</SelectItem>
                    <SelectItem value="blue">Blue (Standby)</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tactile-feedback">
              <AccordionTrigger>Tactile Feedback Modes</AccordionTrigger>
              <AccordionContent>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="continuous">Continuous</SelectItem>
                    <SelectItem value="pulsating">Pulsating</SelectItem>
                    <SelectItem value="short">Short Bursts</SelectItem>
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="braille-mode">
              <AccordionTrigger>Braille Mode</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <Switch id="braille-enable" />
                  <Label htmlFor="braille-enable">Enable Braille Output</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gesture-controls">
              <AccordionTrigger>Gesture Controls</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2">
                  <Switch id="gesture-enable" />
                  <Label htmlFor="gesture-enable">Enable Gesture Controls</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="audio-guide-speed">
              <AccordionTrigger>Audio Guide Speed</AccordionTrigger>
              <AccordionContent>
                <Slider
                  value={[audioGuideSpeed]}
                  onValueChange={(value) => setAudioGuideSpeed(value[0])}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
                <p>Current speed: {audioGuideSpeed}x</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="diagnostics">
              <AccordionTrigger>Diagnostics and Troubleshooting</AccordionTrigger>
              <AccordionContent>
                <Button>Run Device Diagnostics</Button>
                <Button className="ml-2">View Error Logs</Button>
                <div className="mt-2">
                  <h4 className="font-semibold">Reset Options:</h4>
                  <Button variant="destructive" className="mt-1">Factory Reset</Button>
                  <Select className="mt-2">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selective Reset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wifi">Reset Wi-Fi</SelectItem>
                      <SelectItem value="navigation">Reset Navigation</SelectItem>
                      <SelectItem value="audio">Reset Audio Settings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="profiles">
              <AccordionTrigger>Profiles and Personalization</AccordionTrigger>
              <AccordionContent>
                <Button>Create New Profile</Button>
                <Select className="mt-2">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Profile</SelectItem>
                    <SelectItem value="outdoor">Outdoor Profile</SelectItem>
                    <SelectItem value="indoor">Indoor Profile</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2">
                  <Label htmlFor="device-name">Device Nickname</Label>
                  <Input id="device-name" placeholder="Enter device name" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
        </CardContent>
      </Card>
    </div>
  )
}


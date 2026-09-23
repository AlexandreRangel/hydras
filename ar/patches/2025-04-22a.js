// Load Tone.js by adding it to the head
const toneScript = document.createElement('script')
toneScript.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js"
document.head.appendChild(toneScript)

// Make sure Hydra is initialized first
// Basic Hydra setup to ensure canvas is created
s0.initCam() // Initialize a source (camera) just to make sure Hydra is ready
solid(0, 0, 0).out() // Display a black background initially

// Initialize audio values
window.bassValue = 0
window.midValue = 0
window.trebleValue = 0
window.waveformData = new Float32Array(128).fill(0.5)

// Wait for Tone.js to load
toneScript.onload = async () => {
  console.log("Tone.js loaded!")

  // Create a start button (Tone.js needs user interaction)
  const startButton = document.createElement('button')
  startButton.textContent = "Start Audio + Visuals"
  startButton.style.position = "absolute"
  startButton.style.top = "10px"
  startButton.style.left = "10px"
  startButton.style.zIndex = "9999"
  startButton.style.padding = "10px"
  startButton.style.background = "#ff5500"
  startButton.style.color = "white"
  startButton.style.border = "none"
  startButton.style.borderRadius = "4px"
  startButton.style.cursor = "pointer"

  startButton.onclick = async () => {
    // Required for audio playback (must be triggered by user interaction)
    await Tone.start()
    console.log("Audio started")
    startButton.style.display = "none"

    // Create audio elements with Tone.js
    setupAudio()

    // Setup Hydra visuals that react to the audio
    setupHydraVisuals()
  }

  document.body.appendChild(startButton)
}

// Setup all audio elements
function setupAudio() {
  // Create a synth and connect it
  const synth = new Tone.PolySynth(Tone.Synth).toDestination()

  // Create a ping-pong delay effect
  const delay = new Tone.PingPongDelay("8n", 0.4).toDestination()

  // Create another synth with the effect
  const fmSynth = new Tone.FMSynth().connect(delay)

  // Use an analyzer to get audio data
  const analyzer = new Tone.Analyser("waveform", 128)
  fmSynth.connect(analyzer)

  // Create three specific analyzers for frequency bands
  const bassAnalyzer = new Tone.Analyser("fft", 32)
  const midAnalyzer = new Tone.Analyser("fft", 32)
  const trebleAnalyzer = new Tone.Analyser("fft", 32)

  // Low-pass filter for bass
  const bassFilter = new Tone.Filter({
    frequency: 200,
    type: "lowpass"
  })

  // Band-pass filter for mids
  const midFilter = new Tone.Filter({
    frequency: 1000,
    Q: 1,
    type: "bandpass"
  })

  // High-pass filter for treble
  const trebleFilter = new Tone.Filter({
    frequency: 3000,
    type: "highpass"
  })

  // Connect filters to analyzers
  fmSynth.fan(bassFilter, midFilter, trebleFilter)
  bassFilter.connect(bassAnalyzer)
  midFilter.connect(midAnalyzer)
  trebleFilter.connect(trebleAnalyzer)

  // Create a sequence of notes
  const notes = ["C3", "E3", "G3", "B3", "C4", "D4", "E4"]

  // Create a sequence that plays notes
  const seq = new Tone.Sequence((time, idx) => {
    // Play a note with the first synth
    synth.triggerAttackRelease(notes[idx], "16n", time)

    // Play a higher note with the FM synth on certain beats
    if (idx % 2 === 0) {
      fmSynth.triggerAttackRelease(notes[(idx + 2) % notes.length] + "5", "8n", time)
    }

    // Update the visuals on each beat (will be used by Hydra)
    Tone.Draw.schedule(() => {
      window.waveformData = analyzer.getValue()

      // Get frequency data from the different bands
      const bassData = bassAnalyzer.getValue()
      const midData = midAnalyzer.getValue()
      const trebleData = trebleAnalyzer.getValue()

      // Calculate average values for each frequency band
      window.bassValue = bassData.reduce((sum, val) => sum + Math.abs(val), 0) / bassData.length
      window.midValue = midData.reduce((sum, val) => sum + Math.abs(val), 0) / midData.length
      window.trebleValue = trebleData.reduce((sum, val) => sum + Math.abs(val), 0) / trebleData.length

      // Scale the values to be more useful for visuals
      window.bassValue = map(window.bassValue, -100, -30, 0, 1)
      window.midValue = map(window.midValue, -100, -30, 0, 1)
      window.trebleValue = map(window.trebleValue, -100, -30, 0, 1)

      // Clamp values between 0 and 1
      window.bassValue = Math.max(0, Math.min(1, window.bassValue))
      window.midValue = Math.max(0, Math.min(1, window.midValue))
      window.trebleValue = Math.max(0, Math.min(1, window.trebleValue))

      // Print debug info every few seconds
      if (Math.random() < 0.01) {
        console.log(`Audio values - Bass: ${window.bassValue.toFixed(2)}, Mid: ${window.midValue.toFixed(2)}, Treble: ${window.trebleValue.toFixed(2)}`)
      }
    }, time)
  }, notes.map((_, i) => i), "8n")

  // Helper function to map values from one range to another
  function map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }

  // Set Tone.js transport
  Tone.Transport.bpm.value = 120
  Tone.Transport.start()
  seq.start(0)
}

// Setup Hydra visuals
function setupHydraVisuals() {
  // Helper functions to get audio data safely
  window.getBass = () => window.bassValue || 0
  window.getMid = () => window.midValue || 0
  window.getTreble = () => window.trebleValue || 0
  window.getWaveform = (index) => {
    if (!window.waveformData) return 0.5
    return (window.waveformData[index % window.waveformData.length] + 1) / 2
  }

  // Simple direct version to ensure visuals are working
  // This is a very clear audio-reactive pattern
  osc(10, 0.1, () => 0.5 + window.getBass())
    .color(0.8, 0.3, 0.9)
    .modulate(
      noise(3).add(shape(4, () => 0.5 + window.getMid(), 0)),
      () => window.getBass() * 0.8
    )
    .add(
      shape(4, 0.6, 0)
        .color(1, 0.5, 0.2)
        .rotate(() => time * 0.2)
        .scale(() => 0.5 + window.getTreble() * 2),
      0.4
    )
    .out(o0)

  // Show a visible indication it's working
  console.log("Hydra visuals initialized and running!")
}

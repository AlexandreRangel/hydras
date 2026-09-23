# Set the tempo and tuning to 432Hz
use_bpm 30
use_tuning :just
set(:scale, :minor_pentatonic)


with_fx :compressor, mix: 0.75 do

  # Function to create a lush, evolving pad sound
  define :ambient_pad do |note, amp=0.3, pan=0|
    with_fx :reverb, room: 1, damp: 0.8 do
      with_fx :slicer, phase: [8, 16].choose, mix: 0.2 do
        synth :sine, note: note, sustain: 10, release: 6, attack: 4, amp: amp, pan: pan
        synth :tri, note: note - 12, sustain: 10, release: 6, attack: 4, amp: amp * 0.7, pan: -pan
      end
    end
  end

  # Function to generate slowly evolving melodies
  define :melody do |scale|
    use_random_seed Time.now.usec
    8.times do
      play (scale.choose), release: 6, amp: 0.2
      sleep [4, 8].choose
    end
  end

  # Background texture using noise
  live_loop :background_noise do
    with_fx :reverb, room: 1, damp: 0.6, mix: 0.7 do
      with_fx :ixi_techno, phase: 16, mix: 0.3 do
        synth :dark_ambience, note: :e2, sustain: 24, amp: 0.1, release: 8
      end
    end
    sleep [8,16,24,32].choose
  end

  # Evolving pad layers
  live_loop :pads do
    notes = scale(:e3, get(:scale), num_octaves: 2).shuffle.take(3)
    ambient_pad(notes[0], 0.4, -0.3)
    sleep 4
    ambient_pad(notes[1], 0.3, 0.3)
    sleep 4
    ambient_pad(notes[2], 0.5, -0.2)
    sleep [8,16,24,32].choose
  end

  # Evolving melody layers
  live_loop :melodies do
    use_synth :piano
    melody(scale(:e4, get(:scale), num_octaves: 2))
    sleep [2,4,8,16,24].choose
  end

  # Soft, warm bassline
  live_loop :bassline do
    with_fx :reverb, room: 1, damp: 0.3, mix: 0.5 do
      use_synth :tri
      play scale(:e2, :minor_pentatonic).choose, release: 16, amp: 0.3
    end
    sleep [8,16,24,32].choose
  end

  # Sporadic bell sounds for a transcendental feel
  live_loop :bells do
    sync :melodies
    with_fx :gverb, room: 60, mix: 0.3 do
      use_synth :pretty_bell
      play scale(:e5, :minor_pentatonic).choose, release: 8, amp: 0.1
      sleep [8,16,24,32].choose
    end
  end

end

with_fx :echo do
  live_loop :drops1 do
    use_synth :pluck
    play scale(:c4,:aeolian).choose,
      amp: rrand(0.01,1.5),pan: [-1,1].choose
    wait [0.125,0.125,0.25,0.25,0.5,0.75,1,2].choose
    play scale(:c5,:aeolian).choose,
      amp: rrand(0.01,1), pan: [-1,1].choose
    wait [0.125,0.125,0.25,0.25,0.5,0.75,1,2].choose
  end
end

with_fx :echo do
  with_fx :flanger, mix: 0.8 do
    live_loop :drops2 do
      use_synth :pluck
      play scale([:e3,:c3].choose,:aeolian).choose,
        amp: rrand(0.01,1.333), pan: [-1,1].choose
      wait rrand(0.1,2)
      play scale(:c5,:aeolian).choose,
        amp: rrand(0.01,0.75), pan: [-1,1].choose
      wait rrand(0.1,2)
    end
  end
end
with_fx :compressor do
  with_fx :octaver, sub_amp: 1.5, super_amp: 0 do
    with_fx :echo, phase: 0.5, decay: 4 do
      live_loop :drops3 do
        with_fx :flanger, delay: 2, mix: 0.5 do
          use_synth :chiplead
          play scale(:e4,:aeolian).choose,
            attack: rrand(3,6), release: rrand(3,6),
            amp: rrand(0.01,1.8), pan: rrand(-1,1), pan_slide: 6
          wait rrand(3,5)
          play scale(:d3,:aeolian).choose,
            attack: 3, release: 2, amp: rrand(0.1,1.8),
            pan: rrand(-1,1), pan_slide: 6
          wait rrand(3,5)
        end
      end
    end
  end
end

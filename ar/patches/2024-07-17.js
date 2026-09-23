set_sched_ahead_time! 9
use_bpm 15
with_fx :compressor, pre_amp: 11 do
  with_fx :echo, phase: 0.5, mix: 0.5 do
    with_fx :bitcrusher, mix: 0.2 do
      with_fx :echo, phase: 0.125 do
        with_fx :echo, phase: 0.25 do
          live_loop :click1 do
            with_fx :eq, high: rrand(-4,-2), high_slide: [0.125,0.25].choose do
              with_fx :reverb, room: rrand(0.5,1), damp: rrand(0,0.5) do
                with_fx :ping_pong, mix: rrand(0.4,0.8) do
                  with_fx :whammy, mix: rrand(0.222,0.333) do
                    with_fx :vowel, vowel_sound: [1,2,3,4,5].choose, mix: 0.8 do
                      use_synth :kalimba
                      play rrand(36,48), amp: rrand(0.7,1),
                        attack: rrand(0.001,0.1), release: rrand(0.001,0.1) if one_in([1,2,3,4].choose)
                      sleep [0.125,0.25].choose
                      sleep 1 if one_in(7)
                      play scale([:e2,:a2,:f1].choose,:spanish), amp: rrand(0.5,0.9),
                        attack: rrand(0.001,0.05), release: rrand(0.001,0.05) if one_in([1,2,3,4].choose)
                      sleep [0.125,0.25].choose
                      sleep 1 if one_in(9)
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end

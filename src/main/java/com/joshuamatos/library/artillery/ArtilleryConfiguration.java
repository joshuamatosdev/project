package com.joshuamatos.library.artillery;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ArtilleryConfiguration {

    @Bean
    CommandLineRunner commandLineRunner(ArtilleryRepository artilleryRepository) {
        return args -> {
            Artillery artilleryOne = new Artillery(
                    "M1 240 mm Howitzer",
                    23013,
                    true, 7, "The 240 mm howitzer was the most powerful weapon deployed by US field artillery units during World War II, able to fire a 360 lb (160 kg) high explosive projectile 25,225 yards (23,066 m). It was the largest field piece used by the US Army during the war except for naval ordnance adapted into railway guns.");
            Artillery artilleryTwo = new Artillery("M198 howitzer", 30100, true, 6,
                    "The guns’ range was so great Parisians initially believed they were under attack from high altitude zeppelins because the gun could be neither seen nor heard at such a distance. It could fire shells up to 80 miles.");
            Artillery artilleryThree = new Artillery("8-inch gun M1", 600, true, 8,
                    "Motorised transport was still in its infancy and the majority of artillery was transported by horses throughout the war.");
            Artillery artilleryFour = new Artillery("155 mm M982A1 Excalibur ", 70006, true, 2,
                    "The crew comprised an NCO in command; a layer, responsible for the gun’s alignment and elevation; a gunner, responsible for opening and closing the breech; and three additional crew responsible for moving the shells and setting fuses.");
            Artillery artilleryFive = new Artillery("Type 66 howitzer [Enemy]", 17230 , false, 6,
                    "The greatest rate of fire attainable by the British was 48 rounds in 75 seconds This rarely, if ever, occurred in practice, though at that rate it would take 13 minutes for a battery to exhaust its full supply of ammunition.");
            Artillery artillerySix = new Artillery("PHL-81 [Enemy]", 45000 , false, 6,
                    "These increased range by up to 95%. The German 7.7cm gun at the start of the war had a range of 6,000 yards this rose to 11,700 yards.");
            Artillery artillerySeven = new Artillery("LDIF 66 [Enemy]", 25000 , false, 8,
                    "These increased range by up to 95%. The German 7.7cm gun at the start of the war had a range of 6,000 yards this rose to 11,700 yards.");
            Artillery artilleryNukeBlast = new Artillery("Tsar Bomb [Blast]", 8000 , false, 1,
                    "Tsar Bomba, (Russian: “King of Bombs”) , byname of RDS-220, also called Big Ivan, Soviet thermonuclear bomb that was detonated in a test over Novaya Zemlya island in the Arctic Ocean on October 30, 1961. The largest nuclear weapon ever set off, it produced the most powerful human-made explosion ever recorded");

            Artillery artilleryEight = new Artillery("Chicxulub  [Asteroid] ", 1800000, false, 1,
                    "It is partly in the Yucatán Peninsula in Mexico and partly underwater. The Chicxulub crater is more than 180 km (110 mi) in diameter, making it the third largest confirmed impact crater. Petroleum prospectors found it in the late 1970s. The bolide which formed the crater was at least 10 km (6 mi) in diameter.");

            artilleryRepository.saveAll(List.of(artilleryOne, artilleryTwo, artilleryThree, artilleryFour, artilleryFive, artillerySix, artillerySeven, artilleryNukeBlast, artilleryEight));
        };
    }
}

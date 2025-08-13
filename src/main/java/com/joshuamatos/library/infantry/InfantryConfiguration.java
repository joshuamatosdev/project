package com.joshuamatos.library.infantry;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class InfantryConfiguration {

    @Bean
    CommandLineRunner commandLineRunnerInfantry(InfantryRepository infantryRepository) {
        return args -> {
            Infantry infantryOne = new Infantry(
                    "Hellbringers",
                    23013,
                    true, 7, "Returning from the original Halo Wars, Hellbringers are a cheap anti-infantry unit with a big flamethrower and a lovely Scots accent. They are strong versus buildings and infantry (obviously), weak to vehicles, and can’t engage aircraft. They’re available at tier zero, so can be a deadly rush unit. You can upgrade them with dispersion nozzles, which can set the ground on fire, at tier two.");
            Infantry infantryTwo = new Infantry("ODSTs", 30100, true, 6, "Orbital Drop Shock Troopers, or ODSTs, are a special forces group within the marines, which we suppose makes them the best of the best of the best. Elite infantry, they can be dropped into combat at a moment’s notice. They have the ‘Demolition Charge’ active ability, with which they will throw timed explosives that are effective against structures and garrisons.\n" +
                    "\n" +
                    "In blitz, they are only available via a power, which drops a squad of them, and are exclusive to Captain Cutter.");
            Infantry infantrySix = new Infantry("Sniper", 45000 , true, 6,
                    "Snipers are cloaked scouts who excel at picking off enemy infantry at very long range. They can also cloak themselves and detect enemy cloaked units, but they can’t engage either vehicles or aircraft. They are available at tier one and can be upgraded with a Stanchion rifle at tier three, gaining extra damage.");
            Infantry infantryEight = new Infantry("Spartan", 180000, true, 1,
                    "Spartans are technologically-enhanced super soldiers, created by the UNSC in a series of ethically dubious training programmes. John-117, better-known as the Master Chief, is the poster boy of the Halo shooter games and a product of the Spartan-II programme.");
            infantryRepository.saveAll(List.of(infantryOne, infantryTwo, infantrySix, infantryEight));
        };
    }
}

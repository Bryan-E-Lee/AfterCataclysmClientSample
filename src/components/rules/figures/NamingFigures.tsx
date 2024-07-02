import React, { useState } from "react";
import { Die } from "../../figures/Die";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { CopyableText } from "../../theming/clipboard/CopyableText";

//100
const MasculineFirstNames = [
    "Aero", "Adrion", "Attom", "Aleksander", "Armani", "Apiar", "Apparatis", "Autto",
    "Barthas", "Blue", "Boyle", "Broccolini",
    "Cam", "Caulian", "Carlton", "Chip", "Chronos", "Clestus", "Cobalt", "Combusto", "Copernicus", "Cosmo", "Crag",
    "Damien", "Dane", "Deimos", "Dryll", "Dynamo",
    "Eathon", "Elias", "Everett", "Ezra",
    "Forrestt", "Franko",
    "Gajett", "Garrik", "Ganymede", "Grady", "Greysonne", "Gyro",
    "Harlan", "Harvee", "Hudsen", "Hyperion",
    "Imperius", "Isaak",
    "Jaxon", "Jakob", "Jaydon", "Jonne", "Josiah", "Justinian",
    "Kolton", "Kristof", "Krypton",
    "Landon", "Leonardo", "Levver", "Lookan", "Lookas",
    "Mayson", "Matte", "Medius", "Meter", "Mikel", "Miles",
    "Nero", "Neutron", "Nickelas", "Nucleas",
    "Octavias", "Owenn",
    "Petron", "Phobos", "Proteus",
    "Quasar",
    "Ratio", "Redd", "Roman", "Rudolph",
    "Sage", "Saladan", "Solder", "Somnian", "Sylas", "Sprock",
    "Theodias", "Titus", "Tomcat", "Troye", "Turbo",
    "Ulysses",
    "Vyral",
    "Welldon", "Willix", "Wyatt",
    "Xavian", "Xerxes",
    "Zendell", "Zorro"
];

export const MasculineFirstNamesTable = () => {
    const tableContents = [];
    for (let i = 0; i < MasculineFirstNames.length; i++) {
        const tensDigit = Math.floor(i/10);
        const onesDigit = i - tensDigit * 10;
        tableContents.push(<tr key={i}>
            <td className="align-center"><Die>{tensDigit}</Die><Die>{onesDigit}</Die></td>
            <td>{MasculineFirstNames[i]}</td>
        </tr>)
    }
    return (
        <table className="themed-table">
            <thead>
                <tr>
                    <th>Roll</th><th>Name</th>
                </tr>
            </thead>
            <tbody>
                {tableContents}
            </tbody>
        </table>
    );
}

//101
const FeminineFirstNames = [
    "Alkalynne", "Agensie", "Angeline", "Andromeda", "Antonella", "Atrissen", "Awbrie",
    "Batteri", "Baylee", "Benzene", "Biologie", "Brook",
    "Cam", "Callisto", "Carla", "Chelle", "Chlo", "Corona", "Clariss", "Codeine", "Combusta", "Curie",
    "Dakota", "Dalia",
    "Ellipse", "Eureka", "Evelin", "Everette",
    "Fiona", "Fissia", "Flu", "Florine", "Fusia",
    "Galaxi", "Gamma", "Gaya", "Glora", "Ginger", "Gwenn",
    "Harper", "Hayle", "Heidi", "Helena", "Helical", "Hydraulia",
    "Jasmynte", "Jemimah", "Jellona", "Joella", "Joulia",
    "Karma", "Karani", "Katrina", "Kaylani", "Kendell", "Kira",
    "Kale", "Kaleesee", "Karinna",
    "Leighton", "Lillian", "Lizbet", "Luna",
    "Malani", "Magnesia", "Marlee", "Maya", 
    "Nancie", "Nebula", "Neena", "Nilah", "Nova", "Nukie",
    "Olidia", "Oscilla",
    "Petrolia", "Piper", "Plasma", "Pressia", "Proxima",
    "Quinn",
    "Raygan", "Rotora", "Roserie",
    "Seismi", "Shannoth", "Siloh", "Skye", "Solder", "Stardust", "Stylla",
    "Talia", "Turbina",
    "Vanessa", "Verra", "Vivianne",
    "Willow", "Witnee", "Wynter",
    "Xenon",
    "Zealda",
];

export const FeminineFirstNamesTable = () => {
    const tableContents = [];
    for (let i = 0; i < FeminineFirstNames.length; i++) {
        const tensDigit = Math.floor(i/10);
        const onesDigit = i - tensDigit * 10;
        tableContents.push(<tr key={i}>
            <td className="align-center"><Die>{tensDigit}</Die><Die>{onesDigit}</Die></td>
            <td>{FeminineFirstNames[i]}</td>
        </tr>)
    }
    return (
        <table className="themed-table">
            <thead>
                <tr>
                    <th>Roll</th><th>Name</th>
                </tr>
            </thead>
            <tbody>
                {tableContents}
            </tbody>
        </table>
    );
}

//100
const Surnames = [
    "Aidewell", "Actuater", "Anchorman", "Argon", "Appwell", "Audiopipe", "Autopilot", "Axlebolt",
    "Barman", "Blockbuster", "Bitrate", "Blogson", "Bolter", "Brakewell", "Broadband", "Browser",
    "Carbide", "Cellspire", "Charmwell", "Choppah", "Clubber", "Cogmettal", "Compressor",
    "Diesel", "Drivetrane", "Downlode", "Dunerigger",
    "Emaile", "Ethernet",
    "Fissilemats", "Foodie", "Foxwell", "Fueler",
    "Gamble", "Gearbox", "Greengarden", "Gigawatt",
    "Hidef", "Horsepower", "Hypertext",
    "Impressor", "Influenser",
    "Jetmann", "Jones",
    "Keene", "Kiloton", "Konkrete",
    "Leednozzle", "Lewerpryce", "Lightyear",
    "Maneline", "Megahertz", "Memer", "Missyl",
    "Naylegunner", "Neon", "Nitro", "Nucleus",
    "Opiate", "Overload",
    "Palmer", "Password123", "Paywall", "Pilot", "Plumbob", "Pystonne",
    "Radjammer", "Radon", "Reebar", "Rocketeer",
    "Sayle", "Searlan", "Semiconductor", "Servo", "Skyscraper", "Slotto", "Sonar", "Stargazer", "Steele", "Streamer", "Sneakers", "Spawncamper",
    "Televisor", "Terabyte", "Transmission", "Trendsetter", "Thermoflux", "Turbofanne",
    "Underpass", "Uranite",
    "Veeate", "Viewcount",
    "Wifi", "Wyre",
    "Xaust",
    "Yachtly", "Yeeter", "Yellowcake",
    "Zappah", "Zydwidth"
];

export const SurnamesTable = () => {
    const tableContents = [];
    for (let i = 0; i < Surnames.length; i++) {
        const tensDigit = Math.floor(i/10);
        const onesDigit = i - tensDigit * 10;
        tableContents.push(<tr key={i}>
            <td className="align-center"><Die>{tensDigit}</Die><Die>{onesDigit}</Die></td>
            <td>{Surnames[i]}</td>
        </tr>)
    }
    return (
        <table className="themed-table">
            <thead>
                <tr>
                    <th>Roll</th><th>Name</th>
                </tr>
            </thead>
            <tbody>
                {tableContents}
            </tbody>
        </table>
    );
}

type Gender = "Male" | "Female";

export const CharacterNameGenerator = () => {
    const [name, setName] = useState("");
    const [genderText, setGenderText] = useState("");
    const generate = (gender: Gender) => {
        if (gender == "Male") {
            setGenderText("(Masculine)");
        }
        else {
            setGenderText("(Feminine)");
        }

        const firstNames = gender == "Male"
            ? MasculineFirstNames
            : FeminineFirstNames;

        const firstNameIndex = Math.floor(Math.random() * firstNames.length);
        const firstName = firstNames[firstNameIndex];

        const surnameIndex = Math.floor(Math.random() * Surnames.length);
        const surname = Surnames[surnameIndex];

        setName(`${firstName} ${surname}`);
    }
    return (
        <fieldset className="randomizer">
            <legend>Character Name Generator</legend>
            <ThemedButton onClick={() => generate("Male")}>Generate Masculine Name</ThemedButton>
            &nbsp;or&nbsp;
            <ThemedButton onClick={() => generate("Female")}>Generate Feminine Name</ThemedButton>
            
            {name && <div className="output"><CopyableText>{name}</CopyableText> {genderText}</div>}
            
        </fieldset>
    );
}

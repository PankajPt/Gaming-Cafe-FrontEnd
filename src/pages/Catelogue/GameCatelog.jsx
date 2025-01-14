import GameDescription from './Catelogue.jsx'
import React, { useState } from 'react'
// import images from /src/assets
import BMW from '../../assets/BMW.jpeg'
import CHAIN from '../../assets/CHAIN.webp'
import CS2 from '../../assets/CS2.jpg'
import gmod from '../../assets/gmod.jpg'
import GTA5 from '../../assets/GTA5.webp'
import PUBG from '../../assets/PUBG.png'
import SOT from '../../assets/SOT.png'
import VALORANT from '../../assets/VALORANT.jpg'
import './GameCatelogue.css'

let height = 450
let width = 800

const content = [
    {
        image: BMW,
        title: "Black Myth",
        description: "Wukong is an action RPG inspired by Chinese mythology, where players control a monkey protagonist with abilities like shapeshifting and wielding a magical staff. The game offers intense Soulslike combat, epic boss battles, and a visually stunning world rooted in folklore.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: SOT,
        title: "Sea of Thieves",
        description: "A multiplayer pirate adventure game where players sail across open seas, hunt for treasure, battle rival crews, and complete quests. It’s a blend of exploration, teamwork, and swashbuckling fun.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: VALORANT,
        title: "Valorant",
        description: "A free-to-play tactical first-person shooter developed by Riot Games, featuring 5v5 gameplay where players choose unique agents, each with distinct abilities, to strategize and compete in objective-based matches.",
        height,
        width,
        isImageFirst: true
    },        
    {
        image: CHAIN,
        title: "Chained Together",
        description: "A 3D platformer where up to four players are physically connected by a chain, requiring teamwork to ascend from the depths of hell to freedom.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: CS2,
        title: "Counter-Strike 2",
        description: "The latest iteration of Valve’s iconic tactical FPS, featuring updated graphics, enhanced gameplay mechanics, and improved server performance. Players engage in team-based combat focusing on strategy, precision, and objective control.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: gmod,
        title: "Garry’s Mod",
        description: "A sandbox game allowing players to manipulate objects and create their own game modes using the Source engine. Known for its endless creativity, it’s a platform for building, experimenting, and sharing custom content.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: PUBG,
        title: "PUBG: Battlegrounds",
        description: "A battle royale game where players fight to be the last one standing on sprawling maps. It combines survival, strategy, and fast-paced combat, offering intense solo and team-based gameplay.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: BMW,
        title: "RAFT",
        description: "A survival game set on the open sea, where players gather resources, build a floating shelter, and fend off dangers like sharks while exploring islands and uncovering secrets.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: GTA5,
        title: "GTA 5",
        description: "An open-world action-adventure game that lets players explore the fictional city of Los Santos. With a gripping story, diverse missions, and an expansive online multiplayer mode, it’s a blend of crime, chaos, and creativity.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: BMW,
        title: "Human: Fall Flat",
        description: "A physics-based puzzle and platformer game where players control wobbly, customizable characters navigating surreal landscapes. It emphasizes problem-solving, creativity, and hilarious interactions.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: BMW,
        title: "Fortnite",
        description: "A battle royale game known for its vibrant graphics, creative building mechanics, and constant updates. Players compete solo or in teams to be the last standing while exploring dynamic maps and events.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: BMW,
        title: "Fall Guys",
        description: "A chaotic multiplayer party game where players compete in colorful obstacle courses. With hilarious physics and unpredictable gameplay, it’s a race to survive and claim the crown.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: BMW,
        title: "Dota 2",
        description: "A multiplayer online battle arena (MOBA) game where two teams of five players compete to destroy the enemy's base. With deep strategy, diverse heroes, and competitive gameplay, it’s a cornerstone of the esports scene.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: BMW,
        title: "Phasmophobia",
        description: "A co-op horror game where players investigate haunted locations, using tools to identify different types of ghosts. Its eerie atmosphere and teamwork-based gameplay create a chilling and immersive experience.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: BMW,
        title: "Apex Legends",
        description: "A fast-paced battle royale game featuring unique legends with special abilities. Players form squads to outsmart and outgun opponents in dynamic maps, blending tactical gameplay with intense action.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: BMW,
        title: "Only Up! with Friends",
        description: "A co-op climbing game where players work together to navigate tricky obstacles and ascend sky-high platforms. It’s about teamwork, precision, and reaching new heights with your friends.",
        height,
        width,
        isImageFirst: false
    },
    {
        image: BMW,
        title: "The Finals",
        description: "A team-based first-person shooter combining fast-paced action with dynamic environmental destruction. Set within a virtual game show, players compete in teams to secure cash prizes in destructible arenas, utilizing diverse character classes and abilities.",
        height,
        width,
        isImageFirst: true
    },
    {
        image: BMW,
        title: "Pico Park",
        description: "A cooperative puzzle-platformer game where players must work together to solve challenges and progress through levels. It’s simple yet addictive, offering hilarious and chaotic gameplay with friends.",
        height,
        width,
        isImageFirst: false
    }
]

const itemPerPage = 4

const GameCatelogue = () => {
    const [ currentPage, setCurrentPage ] = useState(1)
    const startIndex = ( currentPage - 1 ) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const currentElements = content.slice(startIndex, endIndex)
    const totalPages = Math.ceil(content.length / itemPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return <div className="container mx-auto p-4">
        {
            currentElements.map((item, index) => {
                return <GameDescription
                    key={index} 
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    height={item.height}
                    width={item.width}
                    isImageFirst={item.isImageFirst}
                />
            })
        }
            <div className="pagination">
                <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                >
                Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? 'active' : ''}
                >
                    {i + 1}
                </button>
                ))}

                <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                >
                Next
                </button>
            </div>
    </div>
}

export default GameCatelogue
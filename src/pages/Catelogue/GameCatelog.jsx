import ImageDescription from './Catelogue.jsx'
import BMW from '../../assets/BMW.jpeg'
// image, description, height, width, isImageFirst
const Catelogue = () => {
    const content = [
        {
            image: BMW,
            description: "Black Myth: Wukong is an action RPG inspired by Chinese mythology, where players control a monkey protagonist with abilities like shapeshifting and wielding a magical staff. The game offers intense Soulslike combat, epic boss battles, and a visually stunning world rooted in folklore.",
            height: 100,
            width: 150,
            isImageFirst: true
        },
        {
            image: BMW,
            description: "Black Myth: Wukong is an action RPG inspired by Chinese mythology, where players control a monkey protagonist with abilities like shapeshifting and wielding a magical staff. The game offers intense Soulslike combat, epic boss battles, and a visually stunning world rooted in folklore.",
            height: 100,
            width: 150,
            isImageFirst: false
        },
        {
            image: BMW,
            description: "Black Myth: Wukong is an action RPG inspired by Chinese mythology, where players control a monkey protagonist with abilities like shapeshifting and wielding a magical staff. The game offers intense Soulslike combat, epic boss battles, and a visually stunning world rooted in folklore.",
            height: 100,
            width: 150,
            isImageFirst: true
        }
    ]
    return <div className="container mx-auto p-4">
        {
            content.map( (item, index) => {
                
            })
        }
    </div>
}

export default Catelogue
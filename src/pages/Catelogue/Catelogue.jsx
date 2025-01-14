const GameDescription = ({ image, title, description, height, width, isImageFirst }) => {
    return (
        <div className="flex items-center mb-8">
            <div className={`flex ${isImageFirst ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                <img
                    src={image}
                    alt="Game"
                    style={{ height: `${height}px`, width: `${width}px` }}
                    className="object-cover mr-4"
                />
                <div>
                    <h2 className="text-4xl font-bold text-blue-600 mb-2">{title}</h2>
                    <p className="text-lg text-gray-700">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default GameDescription;

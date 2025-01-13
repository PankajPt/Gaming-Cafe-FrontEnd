const ImageDescription = ({ image, description, height, width, isImageFirst }) => {
    return (
        <div className="flex items-center mb-8">
            <div className={`flex ${isImageFirst ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                <img
                    src={image}
                    alt="Description"
                    style={{ height: `${height}px`, width: `${width}px` }}
                    className="object-cover mr-4"
                />
                <p className="text-lg">{description}</p>
            </div>
        </div>
    );
};

export default ImageDescription;

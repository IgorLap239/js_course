const command = () => {
    const command = document.querySelector('.command');
    let tmpSrc;

    const photoChanger = (e) => {
        if (e.target.matches('.command__photo')) {
            tmpSrc = e.target.src;
            e.target.src = e.target.dataset.img;
        }
    };

    const photoReturn = (e) => {
        if (e.target.matches('.command__photo')) {
            e.target.src = tmpSrc;
        }
    };

    command.addEventListener('mouseover', photoChanger);
    command.addEventListener('mouseout', photoReturn);

};

export default command;
function buildTabTopic(topic) {
    const buttonElem = document.getElementById(`button-${topic}`);
    const topicContentElem = document.getElementById(`topic-${topic}`);

    buttonElem.addEventListener('click', function () {
        document.getElementById(`button-${currentTopicName}`).classList.remove(`bg-${currentTopicName}`);
        document.getElementById(`button-${currentTopicName}`).classList.add(`bg-gray-700`);
        document.getElementById(`button-${currentTopicName}`).classList.add(`hover:bg-gray-900`);
        document.getElementById(`topic-${currentTopicName}`).classList.add(`hidden`);

        currentTopicName = topic;
        buttonElem.classList.remove(`bg-gray-700`);
        buttonElem.classList.remove(`hover:bg-gray-900`);
        buttonElem.classList.add(`bg-${topic}`);
        topicContentElem.classList.remove(`hidden`);        
  });
};
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomSentence(wordCount) {
    const subjects = [
        'The cat', 'A dog', 'The bird', 'My friend', 'An alien', 'The robot', 'A scientist', 'The wizard', 'The musician', 'The artist',
        'A squirrel', 'A teacher', 'The chef', 'A student', 'The astronaut', 'A detective', 'The farmer', 'A lion', 'The king', 'A queen'
    ];
    const verbs = [
        'jumps', 'runs', 'flies', 'sings', 'dances', 'writes', 'paints', 'explores', 'teaches', 'builds',
        'jumps over', 'whispers to', 'trains', 'plays with', 'dreams about', 'sleeps under', 'searches for', 'watches', 'cooks', 'reads'
    ];
    const objects = [
        'over the fence', 'in the park', 'to the moon', 'with joy', 'at the window', 'under the table', 'by the river', 'in the library', 'during lunch', 'on the stage',
        'with enthusiasm', 'under the stars', 'at the beach', 'in the garden', 'with a smile', 'by the fireplace', 'in the museum', 'on the mountain', 'with curiosity', 'at the concert'
    ];

    let sentence = '';

    while (sentence.split(' ').length < wordCount) {
        const subject = getRandomElement(subjects);
        const verb = getRandomElement(verbs);
        const object = getRandomElement(objects);
        
        let phrase = `${subject} ${verb} ${object}`;
        const phraseWords = phrase.split(' ').length;

        if (sentence.split(' ').length + phraseWords <= wordCount) {
            sentence += phrase + ', ';
        } else {
            // Adjust the final phrase to fit exactly
            let remainingWords = wordCount - sentence.split(' ').length;
            if (remainingWords > 1) {
                phrase = phrase.split(' ').slice(0, remainingWords).join(' ');
                sentence += phrase + '.';
            }
            break;
        }
    }

    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export default generateRandomSentence;

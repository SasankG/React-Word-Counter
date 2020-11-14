import * as React from "react";

const Main: React.FC = () => {

    const [wordCount, setWordCount] = React.useState(Number);
    const [letterCount, setLetterCount] = React.useState(Number);
    const [characterCount, setCharacterCount] = React.useState(Number);
    const [wordList, setWordList] = React.useState<any>([]);

    /**
     * The event handler function for the input, this function accepts the input and updates the following input metrics:
     * 
     * - Character Count: simply the amount of characters within the input (including punctuation marks, white spaces and any ASCII value)
     * - Letter Count: all non white-space characters 
     * - Word Count: all of the words within the input, (words beggining with punctiaion marks are not legible)
     * - Word List: the list of words and their frequencies (see calculateFrequency())
     * 
     * @param {String} textValue. the user text input 
     */
    const handleTextChange = (textValue: String) => {

        setCharacterCount(textValue.length);

        setLetterCount(textValue.replace(/\s/g, '').length);

        const wordArray: Array<string> = textValue.split(' ').filter((potentialWord: String) => {

            const punctuations = [".", ",", ":", "!", "?", "+", "=", "-", "$", "&", "@", "*", "(", ")"];

            const containsNonAlphanumeric: Boolean = punctuations.indexOf(potentialWord.split('')[0]) > -1;

            return potentialWord !== "" && containsNonAlphanumeric === false;

        });

        wordArray.forEach((word: String, index) => {

            wordArray[index] = word.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, "");

        });

        setWordCount(wordArray.length);

        calculateFrequency(wordArray);

    };

    /**
     * This function accepts an array of words created by the handleTextChange() and computes the frequencies of each word
     * - utilizing an Object as a 'map' and a loop operation, the function stores the words and frequencies
     * - the resulting frequency object is converted to an array and stored in local state 
     * 
     * @param {Array<string>} wordArray. the array of words from the text input
     */
    const calculateFrequency = (wordArray: Array<string>) => {

        const frequencyMap: any = {};

        wordArray.forEach((word) => {

            word = word.toLowerCase();

            if (!frequencyMap[word]) {
                frequencyMap[word] = 0;
            };

            frequencyMap[word] += 1;

        });

        setWordList(Object.entries(frequencyMap));

    };

    /**
     * This function responds to the onClick event handler and sorts the list of words (wordList) based off of the argument number value provided (sortBy)
     * - the corresponding buttons will provide an argument of '0' which will sort the words alphabetically or '1' which will sort the words based off of frequency
     * 
     * @param {number} sortBy. the user text input 
     */
    const sortWords = (sortBy: number) => {

        const wordListToSort = [...wordList];

        switch (sortBy) {
            case 0:
                setWordList(
                    wordListToSort.sort((a: string, b: string) => {
                        return a[0] > b[0] ? 1 : -1;
                    })
                );
                break;
            case 1:
                setWordList(
                    wordListToSort.sort((a: string, b: string) => {
                        return b[0] > a[0] ? 1 : -1;
                    })
                );
                break;
            case 2:
                setWordList(
                    wordListToSort.sort((a: string, b: string) => {
                        return a[1] > b[1] ? 1 : -1;
                    })
                );
                break;
            case 3:
                setWordList(
                    wordListToSort.sort((a: string, b: string) => {
                        return b[1] > a[1] ? 1 : -1;
                    })
                );
                break;
            default:
                setWordList(wordListToSort);
        };

    };

    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">React Word Counter!</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Enter text below and watch as the application analyzes it! </h6>

                    <br />

                    <div className="input-group">
                        <textarea className="form-control" placeholder="Enter text here ..." onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>,
                        ): void => handleTextChange(e.target.value)}></textarea>
                    </div>

                    <br />

                    <hr />

                    <br />

                    <h4 className="card-subtitle mb-2 ">Your Text Contains the Following</h4>

                    <br />

                    <table className="table">

                        <tbody>
                            <tr>
                                <th scope="row"># of Words</th>
                                <td>{wordCount}</td>
                            </tr>
                            <tr>
                                <th scope="row"># of Non-Blank Characters</th>
                                <td>{letterCount}</td>
                            </tr>
                            <tr>
                                <th scope="row"># of Total Characters</th>
                                <td>{characterCount}</td>
                            </tr>

                        </tbody>

                    </table>

                    <br />

                    <hr />

                    <br />

                    <h4 className="card-subtitle mb-2 ">Words and Frequencies</h4>

                    <br />

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Word - <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => sortWords(0)}>↑</button><button type="button" className="btn btn-outline-primary btn-sm" onClick={() => sortWords(1)}>↓</button></th>
                                <th scope="col">Frequency - <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => sortWords(2)}>↑</button><button type="button" className="btn btn-outline-primary btn-sm" onClick={() => sortWords(3)}>↓</button></th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                wordList.length > 0 &&
                                wordList.map((word: string, i: number) => {
                                    return (
                                        <tr key={i}>
                                            <td> {word[0]} </td>
                                            <td> {word[1]} </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>



                </div>
            </div>
        </div>
    );
};

export default Main;


import React, { Component } from 'react'
import { randomWord } from './words'
import './Hangman.css'
import img0 from './images/0.jpg'
import img1 from './images/1.jpg'
import img2 from './images/2.jpg'
import img3 from './images/3.jpg'
import img4 from './images/4.jpg'
import img5 from './images/5.jpg'
import img6 from './images/6.jpg'

class Hangman extends Component {
    static defaultProps = {
        maxWrong: 6,
        images: [img0, img1, img2, img3, img4, img5, img6]
    }

    constructor(props) {
        super(props)
        this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() }
        this.handleGuess = this.handleGuess.bind(this)
        this.restart = this.restart.bind(this)
    }

    restart() {
        this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() })
    }

    guessedWord() {
        return this.state.answer
            .split('')
            .map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'))
    }

    handleGuess(evt) {
        let ltr = evt.target.value
        this.setState((st) => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
        }))
    }

    generateButtons() {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
            <button
                key={ltr}
                value={ltr}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ))
    }

    render() {
        const gameOver = this.state.nWrong >= this.props.maxWrong
        const altText = `${this.state.nWrong} / ${this.props.maxWrong} guesses`
        const isWinner = this.guessedWord().join('') === this.state.answer
        let gameState = this.generateButtons()
        if (isWinner) gameState = 'You win!'
        if (gameOver) gameState = 'You lose'

        return (
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrong]} alt={altText} />
                <p>Guessed Wrong: {this.state.nWrong}</p>
                <p className='Hangman-word'>
                    {!gameOver ? this.guessedWord() : this.state.answer}
                </p>
                <p className='Hangman-btns'>{gameState}</p>
                <button id='restart' onClick={this.restart}>
                    Restart?
                </button>
            </div>
        )
    }
}

export default Hangman

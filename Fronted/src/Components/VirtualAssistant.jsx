import React from 'react'
import authBg from '../assets/authBg.png'
import { useNavigate } from 'react-router-dom'

function VirtualAssistant() {

    const navigate = useNavigate()

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(speech)
    }

    function startListening() {

        const recognition = new window.webkitSpeechRecognition()

        recognition.lang = "en-US"
        recognition.start()

        recognition.onresult = (event) => {

            const command =
                event.results[0][0].transcript.toLowerCase()

            console.log(command)

            if (command.includes("registration")) {
                speak("Going to Registration Page")
                navigate("/registration")
            }

            else if (command.includes("home")) {
                speak("Going to Home Page")
                navigate("/")
            }

            else if (command.includes("login")) {
                speak("Going to Login Page")
                navigate("/login")
            }

            else if (command.includes("collections")) {
                speak("Going to Collections Page")
                navigate("/collections")
            }

            else if (command.includes("about")) {
                speak("Going to About Page")
                navigate("/about")
            }

            else if (command.includes("contact")) {
                speak("Going to Contact Page")
                navigate("/contact")
            }

            else if (command.includes("cart")) {
                speak("Going to Cart Page")
                navigate("/cart")
            }

            else if (command.includes("place order") || command.includes("placeorder")) {
                speak("Going to Place Order Page")
                navigate("/placeorder")
            }

            else if (
                command.includes("my orders") ||
                command.includes("my order") ||
                command.includes("orders")
            ) {
                speak("Going to My Orders Page")
                navigate("/my-orders")
            }

            else {
                speak("Page not found or page does not exist")
            }
        }
    }

    return (
        <img
            src={authBg}
            alt="Assistant"
            className='fixed bottom-18 left-7 w-22 h-22 rounded-full z-50 cursor-pointer'
            onClick={startListening}
        />
    )
}

export default VirtualAssistant
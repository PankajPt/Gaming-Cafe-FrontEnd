import React, { useState, useEffect } from 'react'
import GameDescription from './Catelogue.jsx'
import { fetchData } from '../../services/api.service.js'
import { GiArrowDunk, GiSpinningSword } from 'react-icons/gi'
import { ImSpinner8 } from 'react-icons/im'

const itemPerPage = 4
const CACHE_KEY = 'gameCatalogueData'

const GameCatelogue = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getCatalogue = async () => {
            try {
                // Check sessionStorage first
                const cachedData = sessionStorage.getItem(CACHE_KEY)
                if (cachedData) {
                    setGames(JSON.parse(cachedData))
                    setLoading(false)
                    return
                }

                // Fetch fresh data if no cache
                const options = {
                    method: 'GET',
                    data: null,
                    file: null,
                    isBinary: false
                };
                const response = await fetchData('users/catalogue', options)
                const data = response.data
                 // Save to sessionStorage
                 try {
                    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
                } catch (storageError) {
                    console.error('SessionStorage error:', storageError)
                }
                setGames(data)
            } catch (err) {
                setError('Failed to load game catalogue. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        getCatalogue()
    }, [])

    const startIndex = (currentPage - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    const currentGames = games.slice(startIndex, endIndex)
    const totalPages = Math.ceil(games.length / itemPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <ImSpinner8 className="text-6xl text-blue-400 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-xl">
                <GiSpinningSword className="mr-3 text-3xl" />
                {error}
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-12 space-x-4">
                    <GiArrowDunk className="text-4xl text-purple-400" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
                        GAME ARSENAL
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentGames.map((game, index) => (
                        <GameDescription
                            key={game._id}
                            game={game}
                            isImageFirst={index % 2 === 0}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center space-x-4 mt-12">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                            currentPage === 1
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-glow'
                        }`}
                    >
                        Previous
                    </button>

                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                                    currentPage === i + 1
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-glow'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                            currentPage === totalPages
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-glow'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameCatelogue
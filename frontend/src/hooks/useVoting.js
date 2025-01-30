import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const useVoting = (projectId, initialVotes = { upvotes: [], downvotes: [] }) => {
    const [votes, setVotes] = useState(initialVotes);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVote = async (voteType) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`${API_URL}/projects/vote`, {
                projectId,
                voteType,
                userId: 'current-user-id' // Replace with actual user ID
            });

            setVotes(response.data.votes);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.error || 'Vote failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { votes, loading, error, handleVote };
};
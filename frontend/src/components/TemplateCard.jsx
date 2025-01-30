import { useVoting } from '../hooks/useVoting';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faHtml5, faCss3Alt, faSquareJs  } from "@fortawesome/free-brands-svg-icons";

export const TemplateCard = ({ id, title, description, initialVotes }) => {
    const { votes, loading, error, handleVote } = useVoting(id, initialVotes);
    let type = false;
    return (
      <div className="bg-slate-700 rounded-xl p-6 hover:scale-105 transition-transform duration-300 ease-out">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full 
            border border-blue-500/20 hover:bg-indigo-600 hover:border-indigo-600/20 hover:text-white transition-all 
            text-sm font-medium">
            Preview
          </button>
        </div>
        
        {/* Description */}
        <div className="text-slate-300 text-sm leading-relaxed mb-4 h-28 overflow-hidden text-ellipsis line-clamp-5">{description}</div>
        
        {/* Footer with Voting */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {/* Upvote Button */}
            <button 
              onClick={() => handleVote('up')}
              disabled={loading}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg 
                hover:bg-slate-700 transition-colors disabled:opacity-50"
              aria-label="Upvote"
            >
              <svg 
                className={`w-6 h-6 transition-all 
                  ${votes.upvotes.includes('current-user-id') 
                    ? 'fill-green-500 stroke-green-500' 
                    : 'fill-transparent stroke-slate-400 group-hover:stroke-green-400'}`}
                viewBox="0 0 24 24" 
                strokeWidth="2"
              >
                <path d="M12 3L3 18h18L12 3z" />  
              </svg>
              <span className={`text-sm font-medium
                ${votes.upvotes.includes('current-user-id') 
                  ? 'text-green-500' 
                  : 'text-slate-400 group-hover:text-slate-300'}`}>
                {votes.upvotes.length}
              </span>
            </button>

            {/* Downvote Button */}
            <button 
              onClick={() => handleVote('down')}
              disabled={loading}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg 
                hover:bg-slate-700 transition-colors disabled:opacity-50"
              aria-label="Downvote"
            >
              <svg 
                className={`w-6 h-6 transition-all rotate-180 
                  ${votes.downvotes.includes('current-user-id') 
                    ? 'fill-red-500 stroke-red-500' 
                    : 'fill-transparent stroke-slate-400 group-hover:stroke-red-400'}`}
                viewBox="0 0 24 24" 
                strokeWidth="2"
              >
                <path d="M12 3L3 18h18L12 3z" />  
              </svg>
              <span className={`text-sm font-medium
                ${votes.downvotes.includes('current-user-id') 
                  ? 'text-red-500' 
                  : 'text-slate-400 group-hover:text-slate-300'}`}>
                {votes.downvotes.length}
              </span>
            </button>
          </div>

          {/* React Tag - Aligned to the End */}
          <div className="rounded-lg">
          {type? (<FontAwesomeIcon icon={faReact} className='h-8 w-8' />):(
            <div>
            <FontAwesomeIcon icon={faHtml5} className='h-7 w-7' />
            <FontAwesomeIcon icon={faCss3Alt} className='h-7 w-7' />
            <FontAwesomeIcon icon={faSquareJs} className='h-7 w-7' />
            </div>
          )}
          </div>
        </div>
        </div>
    );
};
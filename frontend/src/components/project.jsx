const Projectlist = (props) => {
    const projects = props.projects;

    const handleEdit= ({project})=>{
        if (project.projectType) {
            // localStorage.setItem('project', JSON.stringify(project));
            window.location.href = '/main/react/' + project._id;
        } else {
            window.location.href = '/main/plain/'+ project._id;

        }
    }


    return (
        <div className="flex-1 grid grid-cols-3 ml-96 gap-6">
    <h1 className="text-4xl font-bold col-span-3 p-4 bg-[#1e293b] rounded-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Projects :
    </h1>
    {projects.map((project, index) => (
        <div
            key={index}
            className={`bg-[#1e293b] p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-[#334155] ${
                (index + 1) % 3 === 0 ? 'hover:row-span-2 ' : 'hover:col-span-2 hover:row-span-2'
            }`}
        >
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p className="text-sm text-[#94a3b8]">{project.id}</p>
            <p className="text-sm mt-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, tagIndex) => (
                    <span
                        key={tagIndex}
                        className="bg-[#334155] text-xs px-2 py-1 rounded text-white"
                    >
                        {tag}
                    </span>
                ))}

                <button onClick={()=>handleEdit({project})}>
                    Edit
                </button>
            </div>
        </div>
    ))}
    <div className="min-h-64"></div>
    <div className="min-h-64"></div>
    <div className="min-h-64"></div>
</div>


    );
};

export default Projectlist;

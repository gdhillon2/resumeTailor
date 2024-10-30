import React from 'react';

export default function PreviewTab() {
    return (
        <div className="flex justify-center p-4 h-full">
            <div className="w-[8.5in] h-[11in] bg-white shadow-lg">
                <div className="max-w-[850px] mx-auto p-8 text-gray-700 leading-relaxed">
                    <div className="text-center mb-6">
                        <div className="text-2xl font-bold mb-1">John Doe</div>
                        <div className="text-sm text-gray-500 leading-tight">
                            123 Main Street, City, State 12345
                            <span className="mx-2">|</span>
                            (555) 123-4567
                            <span className="mx-2">|</span>
                            john.doe@email.com
                            <span className="mx-2">|</span>
                            linkedin.com/in/johndoe
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                            Summary
                        </div>
                        <p className="text-sm">
                            Experienced software developer with 5+ years of expertise in full-stack development,
                            specializing in React and Node.js. Proven track record of delivering scalable solutions
                            and leading development teams.
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                            Experience
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-base font-bold">Senior Software Engineer</div>
                                    <div className="text-gray-500 font-bold">Tech Solutions Inc.</div>
                                </div>
                                <div className="text-sm text-gray-500">Jan 2020 - Present</div>
                            </div>
                            <ul className="list-disc ml-5 text-sm mt-2">
                                <li>Led development of company's flagship product, increasing user engagement by 40%</li>
                                <li>Managed team of 5 developers and implemented Agile methodologies</li>
                                <li>Architected and deployed microservices infrastructure using Docker and Kubernetes</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-base font-bold">Software Developer</div>
                                    <div className="text-gray-500 font-bold">Digital Innovations Corp</div>
                                </div>
                                <div className="text-sm text-gray-500">Jun 2018 - Dec 2019</div>
                            </div>
                            <ul className="list-disc ml-5 text-sm mt-2">
                                <li>Developed and maintained multiple client-facing web applications</li>
                                <li>Implemented responsive design principles, improving mobile user experience</li>
                                <li>Collaborated with UX team to optimize user interfaces</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                            Education
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-base font-bold">Bachelor of Science in Computer Science</div>
                                    <div className="text-gray-500 font-bold">State University</div>
                                </div>
                                <div className="text-sm text-gray-500">2014 - 2018</div>
                            </div>
                            <div className="text-sm mt-2">GPA: 3.8 | Dean's List | Computer Science Honor Society</div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-4">
                            Skills
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['JavaScript', 'React', 'Node.js', 'Python', 'Docker', 'Kubernetes', 'AWS', 'Git', 'MongoDB', 'SQL'].map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-gray-100 px-3 py-1 rounded text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

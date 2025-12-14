import React from 'react'
import { teamMembers } from '../lib/links';
const Team = () => {
  return (
    <section>
         <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-primary max-w-3xl mx-auto">
            Dedicated professionals committed to revolutionizing skin health through AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-background rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-secondary transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-tertiary/20"
            >
              <div className={`h-2 bg-gradient-to-r ${member.gradient}`} />
              
              <div className="relative p-8 pb-6">
                <div className="relative mx-auto w-48 h-48 mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-secondary shadow-xl">
                    <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                      <span className="text-6xl text-white font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-light mb-2">
                    {member.name}
                  </h3>
                  <p className={`text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-2`}>
                    {member.title}
                  </p>
                  <p className="text-sm text-tertiary mb-4">
                    {member.role}
                  </p>

                  <div className="flex justify-center gap-3 pt-4 border-t border-tertiary/20">
                    <a
                      href="#"
                      className={`w-10 h-10 rounded-lg bg-secondary hover:bg-gradient-to-br hover:${member.gradient} flex items-center justify-center transition-all duration-300 group/icon`}
                    >
                      <svg className="w-5 h-5 text-tertiary group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className={`w-10 h-10 rounded-lg bg-secondary hover:bg-gradient-to-br hover:${member.gradient} flex items-center justify-center transition-all duration-300 group/icon`}
                    >
                      <svg className="w-5 h-5 text-tertiary group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
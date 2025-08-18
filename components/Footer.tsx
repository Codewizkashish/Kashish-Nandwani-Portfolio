import React from 'react'
import { Github, Linkedin } from "lucide-react"

function Footer() {
  return (
    <footer className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-sm text-muted-foreground font-mono">
      <span>Kashish Nandwani</span>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/Codewizkashish"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/kashish-nandwani-284872291/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="https://leetcode.com/u/codewizkashish/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition"
        >
          <span className="hover:underline">LeetCode</span>
        </a>
        <a
          href="https://www.codechef.com/users/codishkashh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition"
        >
          <span className="hover:underline">CodeChef</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer

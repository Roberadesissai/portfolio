'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageSquare, User, Mail, Sparkles } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formState)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section className="py-20 relative" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 relative"
          >
            <div className="inline-block">
              <h2 className="text-3xl font-bold mb-4 relative">
                Get in Touch
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -right-8 -top-2"
                >
                  <Sparkles className="h-6 w-6 text-primary opacity-75" />
                </motion.div>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-3xl" />
            
            <div className="relative bg-background/50 backdrop-blur-xl border border-primary/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <motion.div
                      animate={{ opacity: focusedField === 'name' ? 1 : 0 }}
                      className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                    />
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      <User className="w-4 h-4 inline-block mr-2" />
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-background/50 border-primary/10 focus:border-primary/20 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <motion.div
                      animate={{ opacity: focusedField === 'email' ? 1 : 0 }}
                      className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                    />
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      <Mail className="w-4 h-4 inline-block mr-2" />
                      Your Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-background/50 border-primary/10 focus:border-primary/20 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative group">
                  <motion.div
                    animate={{ opacity: focusedField === 'message' ? 1 : 0 }}
                    className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                  />
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4 inline-block mr-2" />
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="min-h-[150px] bg-background/50 border-primary/10 focus:border-primary/20 transition-colors"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="relative group bg-primary/10 hover:bg-primary/20 text-foreground px-6"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


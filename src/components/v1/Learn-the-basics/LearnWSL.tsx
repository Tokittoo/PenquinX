'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

//

const installSteps: { title: string; body?: string; code?: string[] }[] = [
  { title: '1.1 Enable Windows Features', body: 'Enable the following features in the Windows Feature app:\n- Windows Subsystem for Linux\n- Virtual Machine Platform' },
  { title: '1.2 Install WSL', body: 'Open CMD as an administrator and type:', code: ['wsl --install'] },
  { title: '1.3 Restart Your PC', body: 'Restart your computer to apply changes.' },
  { title: '1.4 Install Applications from Microsoft Store', body: 'Go to the Microsoft Store and install:\n- Windows Subsystem for Linux\n- Your preferred Linux Distribution (e.g., Ubuntu, Kali Linux, Debian, Oracle, Arch, etc.)' },
  { title: '1.5 Set Up the Linux Distribution', body: 'Open the Linux app and complete the installation process for your chosen Linux distribution.' },
  { title: '1.6 Final Restart', body: 'Restart your PC to finalize the setup.' },
  { title: '1.7 Installation Complete', body: 'Your WSL installation is now complete.' },
]

const extraWSL: { title: string; code: string[]; body?: string }[] = [
  { title: '2.1 Update WSL', body: 'To update the WSL version:', code: ['wsl --update'] },
  { title: '2.2 WSL Version Information', body: 'To get information about WSL, WSLg, and the kernel version:', code: ['wsl --version'] },
  { title: '2.3 List Installed Distributions', body: 'To get a list of all installed distributions:', code: ['wsl --list', 'wsl --all', 'wsl --running', 'wsl --quiet', 'wsl --verbose', 'wsl --online'] },
  { title: '2.4 Set Default Distribution', body: 'To set the default Linux distribution:', code: ['wsl --set-default <Distro>'] },
]

const wslgInstall: { title: string; body?: string; code?: string[] }[] = [
  { title: '3.1 Update and Upgrade Linux Distribution', body: 'Open your Linux distribution and run:', code: ['sudo apt update && sudo apt upgrade'] },
  { title: '3.2 Install Win-KeX', body: 'Install Win-KeX for GUI support:', code: ['sudo apt install kali-win-kex'] },
  { title: '3.3 Configure Win-KeX', body: 'Follow the prompts to fill in the required information.' },
  { title: '3.4 Start GUI', body: 'To start the GUI, type in the terminal:', code: ['kex'] },
]

const modes = [
  { label: 'Window Mode (default)', code: '' },
  { label: 'Enhanced Session Mode', code: '--esm', desc: 'Launch Win-KeX desktop in a dedicated window using Windows native RDP.' },
  { label: 'Seamless Mode', code: '--sl', desc: 'Integrate Win-KeX into the Windows desktop seamlessly.' },
  { label: 'Window Mode', code: '--win', desc: 'Launch Win-KeX desktop in a dedicated window.' },
]

const commands = [
  { label: 'Start Win-KeX server and client', code: '' },
  { label: 'Start Win-KeX server', code: '--start' },
  { label: 'Start Win-KeX client', code: '--start-client' },
  { label: 'Launch in Windows Terminal', code: '--wtstart' },
  { label: 'Stop Win-KeX server', code: '--stop' },
  { label: 'Check Win-KeX server status', code: '--status' },
  { label: 'Stop server and kill processes', code: '--kill' },
  { label: 'Set server password', code: '--passwd' },
  { label: 'Start/Stop Windows sound server', code: '--start-sound / --stop-sound' },
  { label: 'Manage WSLg unix socket', code: '--wslg-restore / --wslg-remove / --wslg-status' },
  { label: 'Display Win-KeX version', code: '--version' },
  { label: 'Display help', code: '--help' },
]

const optionalParams = [
  { label: 'Use container IP address', code: '--ip or -i' },
  { label: 'Optimized for multiscreen', code: '--multiscreen or -m' },
  { label: 'Sound support', code: '--sound or -s' },
  { label: 'Disable Windows OpenGL', code: '--nowgl or -n' },
  { label: 'Disable client reconnecting', code: '--norc or -r' },
  { label: 'Wait longer for desktop in SL mode', code: '--wait or -w' },
  { label: 'Verbose output', code: '--verbose' },
]

const examples = [
  { body: 'Start Win-KeX server in window mode and launch Win-KeX client with sound support:', code: ['kex -s'] },
  { body: 'Start Win-KeX in seamless mode and launch Win-KeX client with sound support:', code: ['kex --sl -s'] },
  { body: 'Start Win-KeX in Enhanced Session Mode with ARM workaround and launch Win-KeX client with sound support:', code: ['kex --esm -i -s'] },
  { body: 'Start Win-KeX server as root in window mode and launch Win-KeX client:', code: ['sudo kex'] },
]

const CopyCodeCard = ({ code, onCopied }: { code: string; onCopied?: () => void }) => {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      if (onCopied) onCopied()
    } catch {}
  }
  return (
    <div className="group relative flex items-center gap-2 rounded-lg border border-border bg-muted/30 dark:bg-muted/20 p-3 transition-all duration-300 hover:border-primary/30 dark:hover:border-primary/40 hover:bg-muted/40 dark:hover:bg-muted/30">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono text-xs select-none">$</span>
          <code className="text-sm font-mono text-foreground break-all">{code}</code>
        </div>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy command"
        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-foreground bg-background hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary rounded-md transition-all duration-300 flex-shrink-0"
      >
        Copy
      </button>
    </div>
  )
}

export function LearnWSL() {
  const [toast, setToast] = React.useState<string | null>(null)
  const toastTimerRef = React.useRef<number | null>(null)

  const handleCopied = () => {
    setToast('Copied to clipboard')
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = window.setTimeout(() => setToast(null), 1600)
  }

  const renderSection = (title: string, subtitle: string, items: any[], renderItem: (item: any, index: number) => React.ReactNode) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 dark:bg-primary/10 p-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-12">
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 border border-border bg-card rounded-md shadow-md px-4 py-2 text-sm"
        >
          {toast}
        </div>
      )}

      {/* Installation section */}
      {renderSection(
        '1. WSL Installation Steps',
        'Follow these steps to install Windows Subsystem for Linux',
        installSteps,
        (step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group relative h-full border-border/50 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-opacity duration-300 pointer-events-none group-hover:from-primary/5 group-hover:to-primary/0 dark:group-hover:from-primary/10 dark:group-hover:to-primary/0" />
              <div className="relative z-10 p-5 space-y-3">
                <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h4>
                {step.body && (
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {step.body}
                  </p>
                )}
                {step.code && step.code.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {step.code.map((c: string) => (
                      <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )
      )}

      {/* Extra WSL */}
      {renderSection(
        '2. Extra WSL Commands',
        'Essential commands to manage and configure WSL',
        extraWSL,
        (s, index) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group relative h-full border-border/50 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-opacity duration-300 pointer-events-none group-hover:from-primary/5 group-hover:to-primary/0 dark:group-hover:from-primary/10 dark:group-hover:to-primary/0" />
              <div className="relative z-10 p-5 space-y-3">
                <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h4>
                {s.body && <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>}
                {s.code && (
                  <div className="space-y-2 pt-2">
                    {s.code.map((c: string) => (
                      <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )
      )}

      {/* WSLg Installation */}
      {renderSection(
        '3. WSLg Installation',
        'Install and configure WSLg for GUI support',
        wslgInstall,
        (s, index) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group relative h-full border-border/50 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-opacity duration-300 pointer-events-none group-hover:from-primary/5 group-hover:to-primary/0 dark:group-hover:from-primary/10 dark:group-hover:to-primary/0" />
              <div className="relative z-10 p-5 space-y-3">
                <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h4>
                {s.body && <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>}
                {s.code && (
                  <div className="space-y-2 pt-2">
                    {s.code.map((c: string) => (
                      <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )
      )}

      {/* Additional Info on WSLg */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="rounded-lg border-2 border-primary/30 bg-primary/5 dark:bg-primary/10 p-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight">4. Additional Info on WSLg</h3>
            <p className="text-sm text-muted-foreground">Advanced configuration and usage options</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Modes */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Modes</h4>
            <div className="space-y-3">
              {modes.map((m, index) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-4 border-border/50 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-md transition-all duration-300">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm">{m.label}</div>
                      {m.code && (
                        <code className="block py-1 px-2 bg-muted/50 border border-border rounded text-xs font-mono mt-1">
                          {m.code}
                        </code>
                      )}
                      {m.desc && (
                        <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Commands */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Commands</h4>
            <div className="grid gap-3 md:grid-cols-2">
              {commands.map((c, index) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Card className="p-4 border-border/50 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-md transition-all duration-300">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm">{c.label}</div>
                      {c.code && (
                        <code className="block py-1 px-2 bg-muted/50 border border-border rounded text-xs font-mono mt-1">
                          {c.code}
                        </code>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optional Parameters */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-lg font-semibold mb-4">Optional Parameters</h4>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {optionalParams.map((p, index) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Card className="p-4 border-border/50 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-md transition-all duration-300">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm">{p.label}</div>
                      <code className="block py-1 px-2 bg-muted/50 border border-border rounded text-xs font-mono mt-1">
                        {p.code}
                      </code>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-lg font-semibold mb-4">Examples</h4>
            <div className="space-y-4">
              {examples.map((e, index) => (
                <motion.div
                  key={e.body}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-5 border-border/50 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">{e.body}</p>
                      <div className="space-y-2">
                        {e.code.map((c: string) => (
                          <CopyCodeCard key={c} code={c} onCopied={handleCopied} />
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}



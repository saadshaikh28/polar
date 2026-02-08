'use client'

import React, { useState } from 'react'
import { schemas } from '@polar-sh/client'
import PolarTrustBadge from '@polar-sh/ui/components/atoms/PolarTrustBadge'
import Button from '@polar-sh/ui/components/atoms/Button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@polar-sh/ui/components/atoms/Select'
import { toast } from '../Toast/use-toast'
import { SettingsGroup, SettingsGroupItem } from './SettingsGroup'
import CopyToClipboardInput from '@polar-sh/ui/components/atoms/CopyToClipboardInput'
import { twMerge } from 'tailwind-merge'

interface OrganizationTrustSettingsProps {
    organization: schemas['Organization']
}

const OrganizationTrustSettings: React.FC<OrganizationTrustSettingsProps> = ({ organization }) => {
    const [theme, setTheme] = useState<'dark' | 'light' | 'glass'>('dark')
    const [variant, setVariant] = useState<'compact' | 'full'>('full')

    const embedCode = `<a href="https://polar.sh/${organization.slug}" target="_blank">
  <img src="https://polar.sh/api/v1/organizations/${organization.id}/trust-badge?theme=${theme}&variant=${variant}" alt="Verified by Polar" />
</a>`

    return (
        <SettingsGroup>
            <SettingsGroupItem
                title="Trust Badge Preview"
                description="Show your customers that your checkout is secured and tax-compliant with Polar."
            >
                <div className="flex flex-col gap-y-4">
                    <div className={twMerge(
                        "flex items-center justify-center p-8 rounded-2xl border border-dashed border-gray-200 dark:border-polar-700 transition-colors",
                        theme === 'light' ? 'bg-gray-50' : 'bg-polar-950'
                    )}>
                        <PolarTrustBadge theme={theme} variant={variant} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500">Theme</label>
                            <Select value={theme} onValueChange={(v: any) => setTheme(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="glass">Glass</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500">Size</label>
                            <Select value={variant} onValueChange={(v: any) => setVariant(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full">Full</SelectItem>
                                    <SelectItem value="compact">Compact</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </SettingsGroupItem>

            <SettingsGroupItem
                title="Embed Code"
                description="Copy and paste this code into your website's footer or checkout page."
            >
                <div className="space-y-4">
                    <CopyToClipboardInput
                        value={embedCode}
                        onCopy={() => {
                            toast({
                                title: 'Copied To Clipboard',
                                description: 'Trust badge embed code copied',
                            })
                        }}
                    />
                    <p className="text-[10px] text-gray-400">
                        Note: The dynamic image API is a proposed enhancement to support no-code platforms.
                    </p>
                </div>
            </SettingsGroupItem>
        </SettingsGroup>
    )
}

export default OrganizationTrustSettings

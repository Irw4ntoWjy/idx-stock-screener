import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Settings2 } from 'lucide-react';
import { useState } from 'react';

export const MaSettingsPopover = () => {
	const [maPeriods, setMaPeriods] = useState({
		ma1: 5,
		ma2: 60,
		ma3: 200,
	});

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">
					<Settings2 className="h-4 w-4" />
					MA Settings
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-64 bg-background border-border"
				align="end"
			>
				<div className="space-y-4">
					<h4 className="font-medium text-sm">
						Moving Average Periods
					</h4>
					<div className="space-y-3">
						<div className="flex items-center justify-between gap-3">
							<Label
								htmlFor="ma1"
								className="text-sm text-muted-foreground"
							>
								MA 1
							</Label>
							<Input
								id="ma1"
								type="number"
								value={maPeriods.ma1}
								onChange={(e) =>
									setMaPeriods((prev) => ({
										...prev,
										ma1: parseInt(e.target.value) || 5,
									}))
								}
								className="w-20 h-8 text-center bg-secondary"
							/>
						</div>
						<div className="flex items-center justify-between gap-3">
							<Label
								htmlFor="ma2"
								className="text-sm text-muted-foreground"
							>
								MA 2
							</Label>
							<Input
								id="ma2"
								type="number"
								value={maPeriods.ma2}
								onChange={(e) =>
									setMaPeriods((prev) => ({
										...prev,
										ma2: parseInt(e.target.value) || 60,
									}))
								}
								className="w-20 h-8 text-center bg-secondary"
							/>
						</div>
						<div className="flex items-center justify-between gap-3">
							<Label
								htmlFor="ma3"
								className="text-sm text-muted-foreground"
							>
								MA 3
							</Label>
							<Input
								id="ma3"
								type="number"
								value={maPeriods.ma3}
								onChange={(e) =>
									setMaPeriods((prev) => ({
										...prev,
										ma3: parseInt(e.target.value) || 200,
									}))
								}
								className="w-20 h-8 text-center bg-secondary"
							/>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

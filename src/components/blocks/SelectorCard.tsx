'use client';
import React, { FunctionComponent } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SelectorCardProps {
    title: string;
    description?: string;
    onSubmit: () => void;
    onCancel: () => void;
    isAdded: boolean;
}

const SelectorCard: FunctionComponent<SelectorCardProps> = ({
                                                                title,
                                                                description,
                                                                onSubmit,
                                                                onCancel,
                                                                isAdded
                                                            }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardFooter className="flex justify-end">
                {/* Conditionally render either Add to Queue or Remove button based on isAdded */}
                {!isAdded ? (
                    <Button
                        variant="green"
                        onClick={onSubmit}
                    >
                        Add to Queue
                    </Button>
                ) : (
                    <Button
                        variant="destructive"
                        onClick={onCancel}
                    >
                        Remove
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default SelectorCard;

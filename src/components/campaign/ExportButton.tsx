// import { getRawAPIPath } from "@/server";
import { Button } from "@mui/material";
import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
const ExportToCSVButton = ({ roundId }: { roundId: string }) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const exportToCSV = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch(`/round/${roundId}/results/csv`, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Accept': 'text/csv',
                    'Access-Control-Allow-Origin': '*',
                },
                method: 'GET',
                credentials: 'include',

            })

            if(!res.ok) {
                throw new Error(`Failed to export: ${res.status} ${res.statusText}`)
            }

            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.download = `round - ${roundId}.csv`
            a.href = url
            a.click()
            setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } catch (e) {
            console.error(e)
            setError((e as Error).message)
        } finally {
            setLoading(false)
        }
    }
    return <Button
        startIcon={<DownloadIcon />}
        variant={error ? 'outlined' : 'contained'}
        color={error ? 'error' : 'success'}
        onClick={exportToCSV}
        sx={{ m: 1, px: 3 }}
        loading={loading}
        disabled={loading}

    >
        Download Results as CSV
    </Button>

}
export default ExportToCSVButton




export function formatDate(date: string | Date | undefined ): string {
    if (!date) {
        return 'Data não disponível'; // Ou outro valor de fallback
    }
    return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}
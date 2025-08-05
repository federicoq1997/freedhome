#!/bin/bash

# Development startup script
echo "🚀 Avvio ambiente di sviluppo Freedhome"

# Check if ports are available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Porta 3000 già in uso (Frontend)"
fi

echo "📁 Directory di lavoro: $(pwd)"

# Start frontend
echo "⚛️  Avvio frontend Next.js..."
cd ./frontend && npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend avviato (PID: $FRONTEND_PID) su http://localhost:3000"

echo ""
echo "🌐 Applicazione disponibile su:"
echo "   Frontend: http://localhost:3000/bookings"
echo ""
echo "📋 Comandi utili:"
echo "   Ctrl+C: Ferma entrambi i server"
echo "   kill $FRONTEND_PID: Ferma solo il frontend"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Arresto server..."
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Server arrestati"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Wait for user to stop
echo "📱 Premi Ctrl+C per arrestare i server"
wait

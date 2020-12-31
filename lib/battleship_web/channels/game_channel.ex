defmodule BattleshipWeb.GameChannel do
    use Phoenix.Channel

    def join("room:game", _message, socket) do
        require Logger
        Logger.info("join room:game channel")
        {:ok, socket}
    end

    def join("room:" <> _private_room_id, _params, _socket) do
        {:error, %{reason: "unauthorized"}}
    end

    def handle_in("guess", %{"body" => body}, socket) do
        broadcast!(socket, "new_msg", %{body: body})
        {:noreply, socket}
    end
end
defmodule BattleshipWeb.UserSocket do
  use Phoenix.Socket
  ## Channels
  # channel "room:*", BattleshipWeb.RoomChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  @impl true
  def connect(_params, socket, _connect_info) do
    require Logger
    Logger.info("socket connected")

    case Redix.start_link("redis://localhost:6379/3", name: :redix) do
      {:ok, conn} ->
        Logger.info("connecton okay")
        with {:ok, _user1} = Redix.command(conn, ["GET", "user1"]),
          {:ok, _user2} = Redix.command(conn, ["GET", "user2"]) do
            Logger.info("lookup done")
        end
        Redix.stop(conn)
      {:error, {:already_started, conn}} ->
        Logger.info("already started")
        with {:ok, _user1} = Redix.command(conn, ["GET", "user1"]),
          {:ok, _user2} = Redix.command(conn, ["GET", "user2"]) do
            Logger.info("lookup done")
        end
      Redix.stop(conn)
    end

    Logger.info("connected")

    {:ok, socket}
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     BattleshipWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  @impl true
  def id(_socket), do: nil
end

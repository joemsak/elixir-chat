defmodule Chat.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_in("msg", %{"body" => body}, socket) do
    broadcast socket, "msg", %{body: body, username: socket.assigns.username}
    {:noreply, socket}
  end
end

defmodule Chat.RoomController do
  use Chat.Web, :controller

  def show(conn, %{"id" => "lobby"}) do
    render conn, :show
  end
end

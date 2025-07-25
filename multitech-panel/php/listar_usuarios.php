<?php
header('Content-Type: application/json');

// Dados simulados (em app real, conectaria a banco)
$usuarios = [
    ["id" => 1, "nome" => "Ana Clara", "email" => "ana@exemplo.com"],
    ["id" => 2, "nome" => "Lucca Locoselli", "email" => "lucca@exemplo.com"],
    ["id" => 3, "nome" => "Carlos Silva", "email" => "carlos@exemplo.com"]
];

echo json_encode($usuarios);
?>


/* =====================================
   MÓDULO DE MATEMÁTICA
===================================== */

.math-resumo {
  background: #fff0f5;
  border: 1px solid #f3d5e1;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 18px;
}

.math-etiqueta {
  color: #bd6e91;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .13em;
}

.math-resumo h2 {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 500;
  margin: 10px 0 6px;
}

.math-resumo p,
.math-semana p,
.math-anotacoes p {
  color: #9a8790;
  font-size: 12px;
  line-height: 1.6;
}

.math-numero {
  color: #bd6e91;
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  margin-top: 14px;
}

.math-barra {
  height: 8px;
  background: #f5dce6;
  border-radius: 20px;
  overflow: hidden;
  margin: 10px 0;
}

.math-barra span {
  display: block;
  height: 100%;
  background: #d987a8;
  border-radius: 20px;
  transition: width .3s ease;
}

.math-resumo small {
  color: #9a8790;
  font-size: 11px;
}

.math-semanas {
  display: grid;
  gap: 13px;
  margin-bottom: 18px;
}

.math-semana,
.math-anotacoes {
  background: #fff;
  border: 1px solid #f2e2e9;
  border-radius: 17px;
  padding: 17px;
  box-shadow: 0 5px 22px rgba(185,117,146,.06);
}

.math-semana-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.math-status {
  color: #bd7894;
  background: #fff1f5;
  border-radius: 20px;
  padding: 5px 9px;
  font-size: 10px;
}

.math-semana h3,
.math-anotacoes h3 {
  color: #604b55;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 7px;
}

.math-tarefas {
  display: grid;
  gap: 10px;
  margin-top: 15px;
  padding-top: 13px;
  border-top: 1px solid #f5e7ed;
}

.math-tarefas label {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #765f69;
  font-size: 12px;
  cursor: pointer;
}

.math-tarefas input {
  accent-color: #d987a8;
  width: 16px;
  height: 16px;
}

.math-anotacoes {
  margin-bottom: 14px;
}

.math-anotacoes textarea {
  width: 100%;
  min-height: 130px;
  resize: vertical;
  padding: 12px;
  border: 1px solid #efdae3;
  border-radius: 12px;
  background: #fffafd;
  color: #574650;
  font: 13px 'DM Sans', sans-serif;
  line-height: 1.6;
  outline: none;
}

.math-anotacoes textarea:focus {
  border-color: #d995b1;
  box-shadow: 0 0 0 3px #fcecf2;
}

.math-salvo {
  font-size: 10px !important;
  margin-bottom: 0;
}

.math-botoes {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 14px;
}

.math-botoes button {
  border: 0;
  border-radius: 11px;
  background: #d987a8;
  color: white;
  padding: 11px 14px;
  font: 600 11px 'DM Sans', sans-serif;
  cursor: pointer;
}

.math-botoes button:hover {
  background: #bd6e91;
}
